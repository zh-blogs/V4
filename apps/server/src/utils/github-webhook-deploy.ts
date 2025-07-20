import { Webhooks } from "@octokit/webhooks";
import { WebhookEventDefinition } from "@octokit/webhooks/types";
import { FastifyBaseLogger } from "fastify";
import {
  addTask,
  getSystemUpgradeInProgress,
  removeTask,
  setSystemUpgradeInProgress,
} from "./task-manager";
import { spawn } from "node:child_process";
import app from "@server/app";

interface WebhookHandleResult {
  result: boolean;
  message?: string;
}

/**
 *
 * @param body github webhook event body
 * @param headers github webhook event headers
 * @returns Promise<WebhookHandleResult>
 * Validates the GitHub webhook event for workflow run completion.
 * Checks if the event is a completed workflow run for deployment.
 * If the event is valid, it returns a success result; otherwise, it returns an error
 */
export async function handleWebhook(
  body: WebhookEventDefinition<"workflow-run-completed">,
  headers: any
): Promise<WebhookHandleResult> {
  const { action, workflow_run } = body;
  const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOK_SECRET!,
  });

  if (
    !(await webhooks.verify(
      JSON.stringify(body),
      headers["x-hub-signature-256"] as string
    ))
  ) {
    return {
      result: false,
      message: "Invalid signature in headers",
    };
  }

  if (action !== "completed" || headers["x-github-event"] !== "workflow_run") {
    return {
      result: false,
      message: "Invalid GitHub webhook request",
    };
  }

  if (
    workflow_run.status !== "completed" ||
    workflow_run.conclusion !== "success"
  ) {
    return {
      result: false,
      message: "Workflow run did not complete successfully",
    };
  }

  if (
    workflow_run.head_branch !== "main" ||
    workflow_run.name !== "deploy" ||
    workflow_run.event !== "push"
  ) {
    return {
      result: false,
      message: "Workflow run is not for deployment",
    };
  }

  return {
    result: true,
  };
}

/**
 *
 * @param body GitHub webhook event body
 * @param headers GitHub webhook event headers
 * @param logger Fastify logger instance
 * @returns
 */
export async function handleReload(
  body: WebhookEventDefinition<"workflow-run-completed">,
  headers: any,
  logger: FastifyBaseLogger
) {
  type LogType = "INFO" | "WARN" | "ERROR" | "STDOUT" | "STDERR";

  const logFunctions: Record<LogType, (message: string) => void> = {
    INFO: (message) => logger.info(message),
    WARN: (message) => logger.warn(message),
    ERROR: (message) => logger.error(message),
    STDOUT: (message) => logger.info(message),
    STDERR: (message) => logger.error(message),
  };
  const instanceId = process.env.pm_id;
  const logs: string[] = [];

  const addLog = (type: LogType, message: string) => {
    const entry = `${new Date().toISOString()} ${type}: ${message.trim()}`;
    logs.push(entry);
    if (logFunctions[type]) {
      logFunctions[type](entry);
    }
  };

  let projectRoot: string | null = null;

  if (!instanceId) {
    addLog(
      "ERROR",
      "Instance id is not set, please make sure you are running in a PM2 environment."
    );
    return;
  }

  await addTask(instanceId, "github-webhook-deploy");
  setSystemUpgradeInProgress(true);
  addLog(
    "INFO",
    `Current system upgrade in progress status: ${getSystemUpgradeInProgress()}`
  );

  try {
    addLog("INFO", "Start deployment process");
    await new Promise<void>((resolve, reject) => {
      const deployProcess = spawn(
        "bash",
        ["-c", "$(git rev-parse --show-toplevel)/scripts/deploy.sh"],
        {
          stdio: "pipe",
          detached: true,
        }
      );
      deployProcess.stdout.on("data", (data) => {
        const output = data.toString();
        addLog("STDOUT", output);
        if (output.includes("Navigated to project root:")) {
          const match = output.match(/Navigated to project root:(.+)/);
          if (match) {
            projectRoot = match[1].trim();
            addLog("INFO", `Project root detected: ${projectRoot}`);
          }
        }
      });
      deployProcess.stderr.on("data", (data) => {
        addLog("STDERR", data.toString());
      });
      deployProcess.on("close", async (code) => {
        if (code !== 0) {
          addLog("ERROR", `Deployment script exited with code ${code}`);
          reject(new Error(`Dep loyment script exited with code ${code}`));
        } else {

          addLog("INFO", "Deployment script executed successfully");
          resolve();
        }
      });
      deployProcess.on("error", (err) => {
        addLog("ERROR", `Failed to start deployment script: ${err}`);
        reject(err);
      });
    });
  } catch (error) {
    addLog("ERROR", `Error during deployment: ${error}`);
  }
  if (projectRoot) {
    const logFilePath = `${projectRoot}/pm2-reload.log`;
    app.redis.set(
      "PM2_RELOAD_LOG",
      logFilePath,
      "EX",
      60
    );
    app.redis.set(
      "STSTEM_RELOAD_SIGNAL",
      "SIGINT",
      "EX",
      60
    );
  }
  // TODO: save logs to database
  await removeTask("running", instanceId, "github-webhook-deploy");
  setSystemUpgradeInProgress(false);
}

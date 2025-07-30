import { Webhooks } from "@octokit/webhooks";
import { WebhookEventDefinition } from "@octokit/webhooks/types";
import { FastifyBaseLogger } from "fastify";
import { spawn } from "node:child_process";
import { GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS } from "@zhblogs/constants/github-webhook-logs-status-types";

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
    workflow_run.name as string !== "deploy" ||
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
export async function handleReload(logger: FastifyBaseLogger): Promise<{
  result: (typeof GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS)[number];
  logs: string[];
}> {
  type LogType = "INFO" | "WARN" | "ERROR" | "STDOUT" | "STDERR";

  const logFunctions: Record<LogType, (message: string) => void> = {
    INFO: (message) => logger.info(message),
    WARN: (message) => logger.warn(message),
    ERROR: (message) => logger.error(message),
    STDOUT: (message) => logger.info(message),
    STDERR: (message) => logger.error(message),
  };

  const codeForMessage: Record<number, string> = {
    0: "Deployment script executed successfully",
    1: "Deployment script exited with code 1",
    90: "No new changes detected, exiting.",
    91: "Changes detected in .env.example, please update your .env file accordingly.",
  };

  const logs: string[] = [];

  const addLog = (type: LogType, message: string) => {
    const entry = `${new Date().toISOString()} ${type}: ${message.trim()}`;
    logs.push(entry);
    if (logFunctions[type]) {
      logFunctions[type](entry);
    }
  };

  return new Promise<{
    result: (typeof GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS)[number];
    logs: string[];
  }>((resolve) => {
    addLog("INFO", "Start deployment process");
    const deployProcess = spawn(
      "bash",
      ["-c", "$(git rev-parse --show-toplevel)/scripts/upgrade.sh"],
      {
        stdio: "pipe",
        detached: true,
      }
    );
    deployProcess.stdout.on("data", (data) => {
      const output = data.toString();
      addLog("STDOUT", output);
    });
    deployProcess.stderr.on("data", (data) => {
      addLog("STDERR", data.toString());
    });
    deployProcess.on("close", (code) => {
      let result: (typeof GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS)[number];
      let logType: LogType = "ERROR";
      let message: string;

      switch (code) {
        case null:
          result = "FAILURE";
          message = "Deployment script closed unexpectedly";
          break;
        case 0:
          result = "SUCCESS";
          logType = "INFO";
          message = codeForMessage[0]!;
          break;
        case 1:
          result = "FAILURE";
          logType = "ERROR";
          message = codeForMessage[1]!;
          break;
        case 90:
          result = "NO_CHANGES";
          logType = "INFO";
          message = codeForMessage[90]!;
          break;
        case 91:
          result = "ENV_CHANGED";
          logType = "WARN";
          message = codeForMessage[91]!;
          break;
        default:
          result = "FAILURE";
          logType = "ERROR";
          message = `Deployment script exited with code ${code}`;
          break;
      }
      addLog(logType, message);
      resolve({ result, logs });
    });

    deployProcess.on("error", (err) => {
      addLog("ERROR", `Failed to start deployment script: ${err}`);
      resolve({ result: "FAILURE", logs });
    });
  });
}

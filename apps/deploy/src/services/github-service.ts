import { WebhookEventDefinition } from "@octokit/webhooks/types";
import { insertGithubWebhookLog } from "@server/db/github-webhook-logs";
import { handleReload } from "@server/utils/github-webhook-deploy";
import { GithubWebhookLogInsert } from "@zhblogs/schemas/github-webhook-logs";
import { FastifyBaseLogger } from "fastify";

/**
 *
 * @param body Webhook event body for "workflow-run-completed"
 * @param headers Headers from the webhook request
 * @param logger Logger instance for logging
 * @returns Promise<void>
 * Handles the deployment process triggered by a GitHub webhook event.
 * It adds a task for deployment, sets the system upgrade status,
 * and processes the reload of the system.
 * It saves the webhook event log to the database,
 * and finally removes the task after completion.
 */
export async function deployService(
  body: WebhookEventDefinition<"workflow-run-completed">,
  headers: any,
  logger: FastifyBaseLogger
): Promise<void> {
  let record = {
    delivery_id: headers["x-github-delivery"],
    workflow_run_id: body.workflow_run.id,
    workflow_run_url: body.workflow_run.html_url,
    workflow_run_created_time: new Date(body.workflow_run.created_at),
    workflow_run_updated_time: new Date(body.workflow_run.updated_at),
    workflow_run_run_started_time: new Date(body.workflow_run.run_started_at),
    actor_id: body.workflow_run.actor?.id || 0,
    actor_username: body.workflow_run.actor?.login || "",
    actor_url: body.workflow_run.actor?.html_url || "",
    triggering_actor_id: body.workflow_run.triggering_actor?.id || 0,
    triggering_actor_username: body.workflow_run.triggering_actor?.login || "",
    triggering_actor_url: body.workflow_run.triggering_actor?.html_url || "",
    commit_id: body.workflow_run.head_commit.id,
    commit_message: body.workflow_run.head_commit.message,
    commit_author_name: body.workflow_run.head_commit.author.name,
    received_webhook_time: new Date(),
  } as Partial<GithubWebhookLogInsert>;
  const { result, logs } = await handleReload(logger);
  record.finished_time = new Date();
  record.status = result;
  record.logs = logs;
  await insertGithubWebhookLog(record as GithubWebhookLogInsert, logger);
}

import app from "@server/app";
import {
  GithubWebhookLogInsert,
  GithubWebhookLogInsertSchema,
  GithubWebhookLogs,
} from "@zhblogs/schemas/github-webhook-logs";
import { FastifyBaseLogger } from "fastify";

export async function insertGithubWebhookLog(
  log: GithubWebhookLogInsert,
  logger: FastifyBaseLogger
) {
  const result = GithubWebhookLogInsertSchema.safeParse(log);
  if (result.error) {
    logger.error(
      "Failed to parse Github Webhook Log insert data" + result.error.message
    );
    return;
  }
  try {
    await app.db.insert(GithubWebhookLogs).values(result.data);
  } catch (error) {
    logger.error("Failed to insert Github Webhook Log: " + error);
  }
}

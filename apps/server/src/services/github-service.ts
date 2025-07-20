import { WebhookEventDefinition } from "@octokit/webhooks/types";
import { handleReload } from "@server/utils/github-webhook-deploy";
import { FastifyBaseLogger } from "fastify";

export async function deployService(
  body: WebhookEventDefinition<"workflow-run-completed">,
  headers: any,
  logger: FastifyBaseLogger
) {
  await handleReload(body, headers, logger);
}

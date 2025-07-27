import { WebhookEventDefinition } from "@octokit/webhooks/types";
import { deployService } from "@server/services/github-service";
import { handleWebhook } from "@server/utils/github-webhook-deploy";
import { FastifyInstance, FastifyRequest } from "fastify";

export const githubRoutesPrefix = "/github";

export async function githubRoutes(app: FastifyInstance) {
  app.post(
    "/webhook",
    async (
      request: FastifyRequest<{
        Body: WebhookEventDefinition<"workflow-run-completed">;
      }>,
      reply
    ) => {
      const { body, headers, log: logger } = request;
      const result = await handleWebhook(body, headers);
      if (result.result === false) {
        app.log.error(result.message);
        return reply.code(400).send({ error: result.message });
      } else {
        reply.code(202).send({ message: "Accepted" });
        app.log.info("GitHub webhook received and validated");
      }
      await deployService(body, headers, logger);
    }
  );
}

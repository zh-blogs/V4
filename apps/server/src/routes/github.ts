import { WebhookEventDefinition } from "@octokit/webhooks/types";
import { deployService } from "@server/services/github-service";
import {
  handleWebhook
} from "@server/utils/github-webhook-deploy";
import { FastifyInstance } from "fastify";

export const githubRoutesPrefix = "/github";

export async function githubRoutes(app: FastifyInstance) {
  app.post(
    "/webhook",
    {
      schema: {
        hide: true,
      },
    },
    async (request, reply) => {
      const { body, log: logger } = request;
      const headers = request.headers;

      const result = await handleWebhook(
        body as WebhookEventDefinition<"workflow-run-completed">,
        headers
      );
      if (result.result === false) {
        app.log.error(result.message);
        return reply.code(400).send({ error: result.message });
      }

      reply.code(202).send({ message: "Accepted" });
      app.log.info("GitHub webhook received and validated");

      await deployService(
        body as WebhookEventDefinition<"workflow-run-completed">,
        headers,
        logger
      );
    }
  );
}

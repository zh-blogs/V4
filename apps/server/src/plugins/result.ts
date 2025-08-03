import { HttpErrorCodes } from "@zhblogs/constants/http-error-types";
import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

async function resultPlugin(app: FastifyInstance) {
  app.decorateReply(
    "success",
    function (this: FastifyReply, data?: any, message: string = "Success") {
      return this.send({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
      });
    }
  );
  app.decorateReply(
    "error",
    function (
      this: FastifyReply,
      error: Error | string,
      status: keyof typeof HttpErrorCodes
    ) {
      const errorMessage = error instanceof Error ? error.message : error;
      return this.status(HttpErrorCodes[status]).send({
        success: false,
        status,
        message: errorMessage,
        timestamp: new Date().toISOString(),
      });
    }
  );
}

export default fp(resultPlugin, {
  name: "reply-result-plugin",
  fastify: "5.x",
});

declare module "fastify" {
  interface FastifyReply {
    success(data?: any, message?: string): FastifyReply;
    error(
      error: Error | string,
      status: keyof typeof HttpErrorCodes
    ): FastifyReply;
  }
}

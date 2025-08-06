import { HttpErrorCodes } from "@zhblogs/constants/http-error-types";
import { FastifyInstance, FastifyReply } from "fastify";
import { ErrorResult, SuccessResult } from "@zhblogs/schemas/response/result";
import fp from "fastify-plugin";

async function resultPlugin(app: FastifyInstance) {
  app.decorateReply("success", function <
    T = any
  >(this: FastifyReply, data?: T, message: string = "Success") {
    return this.send({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    } as SuccessResult);
  });

  app.decorateReply(
    "error",
    function (
      this: FastifyReply,
      error: Error | string,
      status: HttpErrorCodes | keyof typeof HttpErrorCodes
    ) {
      const errorMessage = error instanceof Error ? error.message : error;
      let statusCode: number =
        typeof status === "string" ? HttpErrorCodes[status] : status;
      if (typeof statusCode !== "number" || isNaN(statusCode)) {
        statusCode = 500;
      }
      return this.status(statusCode).send({
        success: false,
        status: statusCode,
        message: errorMessage,
        timestamp: new Date().toISOString(),
      } as ErrorResult);
    }
  );
}

export default fp(resultPlugin, {
  name: "reply-result-plugin",
  fastify: "5.x",
});

declare module "fastify" {
  interface FastifyReply {
    success<T = any>(data?: T, message?: string): FastifyReply;
    error(
      error: Error | string,
      status: HttpErrorCodes | keyof typeof HttpErrorCodes
    ): FastifyReply;
  }
}

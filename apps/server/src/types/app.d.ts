import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    client_session?: string;
  }
}

import { getDatabase } from "@zhblogs/schemas/db";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const db = getDatabase(process.env.POSTGRESQL_URL!);

async function drizzlePlugin(app: FastifyInstance) {
  app.decorate("db", db);
}

export default fp(drizzlePlugin, {
  name: "drizzle-plugin",
  fastify: "5.x",
});

declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
  }
}

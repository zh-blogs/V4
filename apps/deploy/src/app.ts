import Fastify from "fastify";
import { githubRoutes, githubRoutesPrefix } from "./routes/github";
import {
  FastifyLoggerOptions,
  PinoLoggerOptions,
} from "fastify/types/logger.js";
import { format } from "date-fns";
import { FastifyEnvOptions } from "@fastify/env";

const env: string = process.env.NODE_ENV!;

// Logger configuration
const envToLogger: Record<
  string,
  boolean | (FastifyLoggerOptions & PinoLoggerOptions)
> = {
  development: {
    level: "debug",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
  production: {
    level: process.env.LOG_LEVEL || "debug",
    timestamp: () => `,"time":"${format(new Date(), "yyyy-MM-dd HH:mm:ss")}"`,
  },
  test: false,
};

// Create Fastify instance with configuration
const app = Fastify({
  logger: envToLogger[env],
});

// Register plugins
await app.register(import("@fastify/env"), {
  dotenv:
    env === "development"
      ? {
          path: new URL("../../../.env", import.meta.url).pathname,
        }
      : true,
  schema: {
    type: "object",
    required: ["POSTGRESQL_URL"],
    properties: {
      POSTGRESQL_URL: { type: "string" },
    },
  },
} as FastifyEnvOptions);

await app.register(import("./plugins/drizzle"));

// Register routes
await app.register(githubRoutes, { prefix: githubRoutesPrefix });

export default app;

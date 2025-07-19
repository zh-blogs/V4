import Fastify from "fastify";
import { FastifyLoggerOptions, PinoLoggerOptions } from "fastify/types/logger.js";
import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

const env: string = process.env.NODE_ENV!;

// Logger configuration
const envToLogger: Record<string, boolean | FastifyLoggerOptions & PinoLoggerOptions> = {
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
  },
  test: false,
};

// Create Fastify instance with configuration
const app = Fastify({
  logger: envToLogger[env],
});

// Register plugins
if (env === "development") {
  await app.register(import("@fastify/swagger"), {
    openapi: {
      openapi: "3.1.1",
      info: {
        title: "zhblogs server api",
        description: "API documentation for zhblogs server",
        version: "0.0.1",
        contact: {
          name: "zhblogs",
          email: "contact@mail.zhblogs.net",
        },
        license: {
          name: "GNU AFFERO GENERAL PUBLIC LICENSE",
          url: "https://www.gnu.org/licenses/agpl-3.0.html",
        },
      },
      servers: [{ url: "http://localhost:8765" }],
    },
  } as SwaggerOptions);
  await app.register(import("@fastify/swagger-ui"), {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
      persistAuthorization: true,
    },
  } as FastifySwaggerUiOptions);
}

// Register routes

export default app;

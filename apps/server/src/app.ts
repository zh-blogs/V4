import Fastify from "fastify";
import routes from "./routes";
import drizzle from "./plugins/drizzle";
import {
  FastifyLoggerOptions,
  PinoLoggerOptions,
} from "fastify/types/logger.js";
import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import fastifyRedis from "@fastify/redis";
import { format } from "date-fns";

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
    // 修改显示日期为非时间戳的格式
    timestamp: () => `,"time":"${format(new Date(), "yyyy-MM-dd HH:mm:ss")}"`,
  },
  test: false,
};

// Create Fastify instance with configuration
const app = Fastify({
  logger: envToLogger[env],
});

// Register plugins
await app.register(drizzle);
await app.register(fastifyRedis, {
  url: process.env.REDIS_URL!,
});

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
await app.register(routes);

export default app;

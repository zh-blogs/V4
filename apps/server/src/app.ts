import Fastify from "fastify";
import {
  FastifyLoggerOptions,
  PinoLoggerOptions,
} from "fastify/types/logger.js";
import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { format } from "date-fns";
import { FastifyRedisPluginOptions } from "@fastify/redis";
import { FastifyEnvOptions } from "@fastify/env";
import { FastifyCookieOptions } from "@fastify/cookie";
import { fileURLToPath } from "node:url";
import { ZodError } from "zod/v4";
import { createHash } from "node:crypto";
import { v7 } from "uuid";

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
          path: fileURLToPath(new URL("../../../.env", import.meta.url)),
        }
      : true,
  schema: {
    type: "object",
    required: [
      "POSTGRESQL_URL",
      "REDIS_URL",
      "GITHUB_WEBHOOK_SECRET",
      "COOKIE_SECRET",
    ],
    properties: {
      POSTGRESQL_URL: { type: "string" },
      REDIS_URL: { type: "string" },
      GITHUB_WEBHOOK_SECRET: { type: "string" },
      COOKIE_SECRET: { type: "string" },
    },
  },
} as FastifyEnvOptions);

await app.register(import("@fastify/redis"), {
  url: process.env.REDIS_URL!,
} as FastifyRedisPluginOptions);

await app.register(import("@fastify/cookie"), {
  secret: process.env.COOKIE_SECRET!,
  hook: "onRequest",
  algorithm: "sha512-256",
  parseOptions: {
    secure: true,
  },
} as FastifyCookieOptions);

await app.register(import("./plugins/drizzle"));

await app.register(import("./plugins/result"));

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
      servers: [{ url: "http://localhost:9901" }],
    },
  } as SwaggerOptions);
  await app.register(import("@fastify/swagger-ui"), {
    routePrefix: "/doc",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
      persistAuthorization: true,
    },
  } as FastifySwaggerUiOptions);
}

// Add hook
app.addHook("onRequest", async (request, reply) => {
  const client_session = request.cookies.client_session;
  let valid: boolean = false;
  if (client_session) {
    const session_data = !!(await app.redis.get(
      `client_session:${client_session}`
    ));
    const unsigned_cookie = app.unsignCookie(client_session);
    valid = session_data && unsigned_cookie.valid;
  }
  if (!valid) {
    const new_ookie = app.signCookie(
      createHash("sha512").update(v7()).digest("hex").toUpperCase()
    );
    reply.setCookie("client_session", new_ookie, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    });
    app.redis.set(`client_session:${new_ookie}`, "1", "EX", 60 * 60 * 24);
    request.client_session = new_ookie;
  } else {
    request.client_session = client_session;
  }
});

// Add global error handler
app.setNotFoundHandler((request, reply) => {
  reply.error("Not Found", "NOT_FOUND");
});

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.error(`Invalid request parameters: ${error.message}`, "BAD_REQUEST");
  } else if (error.validation) {
    reply.error(`Validation error: ${error.message}`, "BAD_REQUEST");
  } else if (error.statusCode) {
    reply.error(error.message, error.statusCode);
  }
});

// Register routes
await app.register(import("./routes"));

export default app;

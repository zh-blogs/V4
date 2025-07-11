import Fastify from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger.js";

const env: string = process.env.NODE_ENV!;

// Logger configuration
const envToLogger: Record<string, PinoLoggerOptions | boolean> = {
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
  production: true,
  test: false,
};

// Create Fastify instance with configuration
const app = Fastify({
  logger: envToLogger[env],
});

export default app;

import Fastify from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger";

type EnvToLogger = {
  [key: string]: PinoLoggerOptions | boolean;
};

const env: string = process.env.NODE_ENV!;

const envToLogger: EnvToLogger = {
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

const app = Fastify({
  logger: envToLogger[env],
});

export default app;

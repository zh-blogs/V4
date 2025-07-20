import app from "@server/app";
import { getTasks } from "@server/utils/task-manager";
import { migrateDatabase } from "@zhblogs/schemas/migrator";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

async function startServer() {
  try {
    await migrateDatabase();
    app.log.info("Database migration completed successfully");
    await app.listen({
      port: 8765,
    });
    app.log.info(`Server is running on port 8765`);
    app.log.info(`Current environment: ${process.env.NODE_ENV}`);
    const logFilePath = await app.redis.get("PM2_RELOAD_LOG");
    const reloadSignal = await app.redis.get("STSTEM_RELOAD_SIGNAL");
    if (logFilePath && reloadSignal) {
      try {
        const logData = readFileSync(logFilePath, "utf-8");
        const successString = "Applying action reloadProcessId on app";
        if (logData.includes(successString)) {
          app.log.info("PM2 reload log found, successful reload");
        }
        //delete the log file after reading
        const result = execSync(`rm -f ${logFilePath}`);
        app.log.info(`Log file ${logFilePath} deleted successfully`);
      } catch (err) {
        app.log.error(`Failed to read log file ${logFilePath}: ${err}`);
      }
      app.redis.del("PM2_RELOAD_LOG");
      app.redis.del("STSTEM_RELOAD_SIGNAL");
    }
    if (process.send) {
      process.send("ready");
    }
  } catch (err: any) {
    app.log.error(err);
  }
}

process.on("SIGINT", () => {
  const startTime = Date.now();
  app.log.info("Received SIGINT, starting graceful shutdown...");

  function checkTasksAndShutdown() {
    getTasks("running")
      .then((tasks) => {
        if (tasks.length > 0) {
          app.log.info(`There are still running tasks: ${tasks.join(", ")}`);
          app.log.info(
            "Waiting for running tasks to complete before shutting down..."
          );
          setTimeout(
            checkTasksAndShutdown,
            Number(process.env.SHUTDOWN_CHECK_INTERVAL)
          );
          return;
        }

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > Number(process.env.SHUTDOWN_TIMEOUT)) {
          app.log.error("Shutdown timeout exceeded, forcing shutdown...");
          shutdown();
          return;
        }

        if (tasks.length === 0) {
          app.log.info("No running tasks found, proceeding with shutdown...");
          shutdown();
          return;
        }
      })
      .catch((err) => {
        app.log.error("Error during shutdown task check:", err);
        shutdown();
      });
  }

  function shutdown() {
    app
      .close()
      .then(() => {
        app.log.info("Server closed");
        process.exit(0);
      })
      .catch((err) => {
        app.log.error("Error during shutdown:", err);
        process.exit(1);
      });
  }

  checkTasksAndShutdown();
});

startServer();

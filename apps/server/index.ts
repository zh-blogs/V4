import app from "@server/app";
import { acquire } from "@server/utils/redlock";
import { migrateDatabase } from "@zhblogs/schemas/db";

async function startServer() {
  try {
    await app.listen({
      port: 9901,
    });

    const instanceId = process.env.INSTANCE_ID || "unknown";
    app.log.info(`Starting server instance: ${instanceId}`);

    const lockKey = "db_migration_lock";
    const lockKeyUniqueValue = `db_migration_unique_value_${instanceId}`;
    const lock = await acquire(lockKey, lockKeyUniqueValue, 60000);

    if (lock) {
      await migrateDatabase(process.env.POSTGRESQL_URL!);
      app.log.info(
        `Database migration completed successfully on instance ${instanceId}`
      );
    }
    if (process.send) {
      process.send("ready");
    }
  } catch (err: any) {
    console.error("Error starting server:", err);
  }
}

startServer();

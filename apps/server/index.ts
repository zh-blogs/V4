import app from "@server/app";
import { migrateDatabase } from "@zhblogs/schemas/db";

async function startServer() {
  try {
    await migrateDatabase(process.env.POSTGRESQL_URL!);
    app.log.info("Database migration completed successfully");
    await app.listen({
      port: 9901,
    });
    if (process.send) {
      process.send("ready");
    }
    process.send?.("ready");
  } catch (err: any) {
    console.error("Error starting server:", err);
  }
}

startServer();

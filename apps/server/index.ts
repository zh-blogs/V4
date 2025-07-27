import app from "@server/app";
import { migrateDatabase } from "@zhblogs/schemas/migrator";
import "dotenv/config";

async function startServer() {
  try {
    await migrateDatabase();
    app.log.info("Database migration completed successfully");
    await app.listen({
      port: 9901,
    });
    app.log.info(`Server is running on port 8765`);
    if (process.send) {
      process.send("ready");
    }
    process.send?.("ready");
  } catch (err: any) {
    app.log.error(err);
  }
}

startServer();

import app from "@server/app.js";
import { migrateDatabase } from "@zhblogs/schemas/migrator";

async function startServer() {
  try {
    await migrateDatabase();
    app.log.info("Database migration completed successfully");
    await app.listen({
      port: 8765,
    });
    app.log.info(`Server is running on port 8765`);
    app.log.info(`Current environment: ${process.env.NODE_ENV}`);
  } catch (err: any) {
    app.log.error(err);
  }
}

startServer();

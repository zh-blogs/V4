import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./database.js";
import { join } from "node:path";

export async function migrateDatabase(): Promise<void> {
  try {
    await migrate(db, { migrationsFolder: join(__dirname, "drizzle") });
    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Error during database migration:", error);
  }
}

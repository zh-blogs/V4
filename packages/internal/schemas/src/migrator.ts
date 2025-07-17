import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./database.js";

export async function migrateDatabase(): Promise<void> {
  await migrate(db, {
    migrationsFolder: new URL("drizzle", import.meta.url).pathname,
  });
}

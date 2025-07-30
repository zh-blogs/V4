import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

let db: ReturnType<typeof drizzle>;

export function getDatabase(url: string): typeof db {
  if (!db) {
    db = drizzle({
      connection: {
        url,
        idle_timeout: 10000,
      },
      casing: "snake_case",
    });
  }
  return db;
}

export async function migrateDatabase(url: string): Promise<void> {
  await migrate(getDatabase(url), {
    migrationsFolder: new URL("drizzle", import.meta.url).pathname,
  });
}

export type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

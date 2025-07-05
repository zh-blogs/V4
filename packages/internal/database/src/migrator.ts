import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./database";

export async function migrateDatabase(): Promise<void> {
	try {
		await migrate(db, { migrationsFolder: `${__dirname}/drizzle` });
		console.log("Database migration completed successfully.");
	} catch (error) {
		console.error("Error during database migration:", error);
	}
}

import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
	out: "./src/drizzle",
	schema: "./src/schemas/*.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRESQL_URL!,
	},
});

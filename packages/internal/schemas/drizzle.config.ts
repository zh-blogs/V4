import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/drizzle",
	schema: "./src/schemas/*.ts",
	dialect: "postgresql",
});

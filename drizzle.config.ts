import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:migrations/local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

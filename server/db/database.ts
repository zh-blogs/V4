import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:migrations/local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { casing: 'snake_case' });

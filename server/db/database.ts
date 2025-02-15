import { drizzle as drizzleNode } from "drizzle-orm/libsql";
import { createClient as createClientNode } from "@libsql/client";
import { drizzle as drizzleWeb } from "drizzle-orm/libsql/web";
import { createClient as createClientWeb } from "@libsql/client/web";

const config = {
  url: process.env.TURSO_DATABASE_URL || 'file:migrations/local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
}

const isWebEnv = process.env.TURSO_DATABASE_URL && !process.env.TURSO_DATABASE_URL?.startsWith('file:')
const turso = isWebEnv ? createClientWeb(config) : createClientNode(config)

export const db = isWebEnv ? drizzleWeb(turso, { casing: 'snake_case' }) : drizzleNode(turso, { casing: 'snake_case' });

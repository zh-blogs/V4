import dotenv from 'dotenv'
// if node server, import drizzle-orm/node-postgres
import { drizzle } from 'drizzle-orm/neon-serverless'

dotenv.config()

export const db = drizzle({
  casing: 'snake_case',
  connection: process.env.DATABASE_URL!,
})

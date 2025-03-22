import { drizzle } from 'drizzle-orm/node-postgres'
import dotenv from 'dotenv'

dotenv.config()

export const db = drizzle({
  casing: 'snake_case',
  connection: process.env.DATABASE_URL!,
})

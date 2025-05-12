import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

console.log('DATABASE_URL', process.env.DATABASE_URL)

export default defineConfig({
  out: './drizzle',
  schema: './db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import 'dotenv/config'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle({
  client: pool,
  casing: 'snake_case',
})

export const migrateDatabase = async () => {
  try {
    await migrate(db, { migrationsFolder: './drizzle' })
    console.log('Database migration completed successfully.')
  } catch (error) {
    console.error('Error during database migration:', error)
  }
}

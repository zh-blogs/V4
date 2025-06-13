import { migrateDatabase } from '~~/db/database'

export default defineNitroPlugin(async () => {
  if (process.env.NODE_ENV === 'prerender') {
    return
  }
  console.log('Starting database migration...')
  await migrateDatabase()
})

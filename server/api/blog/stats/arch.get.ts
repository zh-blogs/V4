import { isNotNull, sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { db } from '~~/db/database'
import { Blogs } from '~~/db/schema/blogs'
import Result from '~~/server/result'

export interface ArchInfo {
  name: string
  count: number
}

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({
        name: sql`${Blogs.arch}`.as('arch'),
        count: sql`COUNT(*)`.as('count'),
      })
      .from(Blogs)
      .where(isNotNull(Blogs.arch))
      .groupBy(sql`arch`)
      .orderBy(sql`count DESC`)

    return Result.success(result as ArchInfo[])
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    }
    throw e
  }
})

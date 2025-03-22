import { sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { db } from '~~/db/database'
import { Blogs } from '~~/db/schema/blogs'
import Result from '~~/server/result'

export interface SubTags {
  name: string
  count: number
}

export default defineEventHandler(async () => {
  try {
    const result = await db
      .select({
        name: sql`jsonb_array_elements_text(${Blogs.sub_tag})`.as('tag_name'),
        count: sql`COUNT(*)`.as('count'),
      })
      .from(Blogs)
      .where(sql`jsonb_array_length(${Blogs.sub_tag}) > 0`)
      .groupBy(sql`tag_name`)
      .orderBy(sql`count DESC`)

    return Result.success(result as SubTags[])
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    }
    throw e
  }
})

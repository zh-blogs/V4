import { eq, sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { BaseBlogSchema } from '~/shared/types/blog'
import { db } from '~~/db/database'
import { Blogs } from '~~/db/schema/blogs'
import Result from '~~/server/result'

const IncrementSchema = BaseBlogSchema.pick({
  id: true,
})

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    IncrementSchema.safeParseAsync(body),
  )
  if (result.error) {
    const errors = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ')
    return Result.error(`数据验证失败: ${errors}`, 400)
  }

  const targetID = result.data.id

  try {
    await db
      .update(Blogs)
      .set({
        access_count: sql`${Blogs.access_count} + 1`,
      })
      .where(eq(Blogs.id, targetID))
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    }
    throw e
  }
})

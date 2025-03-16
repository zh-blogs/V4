import { eq, sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { z } from 'zod'
import { db } from '~~/server/db/database'
import { Blogs } from '~~/server/db/schema/blogs'
import Result from '~~/server/result'

const IncrementSchema = z.object({
  bid: z.coerce.number({ message: '该字段为什么会不正确？' }),
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

  const targetBID = result.data.bid

  try {
    await db
      .update(Blogs)
      .set({
        access_count: sql`${Blogs.access_count} + 1`,
      })
      .where(eq(Blogs.bid, targetBID))
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    }
    throw e
  }
})

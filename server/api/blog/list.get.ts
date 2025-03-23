import { and, eq } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { ZodError } from 'zod'
import { BlogVOSchema } from '~/shared/types/blog'
import { db } from '~~/db/database'
import { Blogs } from '~~/db/schema/blogs'
import Result from '~~/server/result'

// TODO
// export interface ListResult {
//   total: number
//   data: BlogVO[]
//   page: number
//   pageSize: number
//   totalPages: number
// }

export default defineEventHandler(async () => {
  try {
    const randomBlogs = await db
      .select()
      .from(Blogs)
      .where(and(eq(Blogs.passed, true)))

    const result = randomBlogs.map((blog) => {
      return BlogVOSchema.parse(blog)
    })
    return Result.success(result)
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    } else if (e instanceof ZodError) {
      console.error(e)

      return Result.error('数据解析有误，请报告管理员进行处理', 500)
    }
    throw e
  }
})

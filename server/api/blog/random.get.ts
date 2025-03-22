import { and, eq, sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { z, ZodError } from 'zod'
import { BlogVOSchema } from '~/shared/types/blog'
import { db } from '~~/db/database'
import { Blogs, MAIN_TAGS } from '~~/db/schema/blogs'
import Result from '~~/server/result'

const randomSchema = z.object({
  size: z.coerce
    .number({ message: '无效的参数' })
    .min(1, { message: '你是不打算查询吗？' })
    .max(12, { message: '查询太多服务器要忙死啦QAQ' }),
  recommen: z
    .preprocess(
      (val) => {
        if (val === 'true') return true
      },
      z.literal(true, { message: '参数错误' }),
    )
    .optional(),
  type: z
    .enum(MAIN_TAGS, {
      message: '你确定有这个主分类吗？',
    })
    .optional(),
})
export default defineEventHandler(async (event) => {
  const body = await getValidatedQuery(event, (body) => {
    return randomSchema.safeParseAsync(body)
  })
  if (body.error) {
    const errors = body.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ')
    return Result.error(`数据验证失败: ${errors}`, 400)
  }

  const { size, recommen, type } = body.data

  try {
    const randomBlogs = await db
      .select()
      .from(Blogs)
      .orderBy(sql`random()`)
      .where(
        and(
          recommen ? eq(Blogs.recommen, recommen) : undefined,
          type ? eq(Blogs.main_tag, type) : undefined,
          eq(Blogs.status, 'OK'),
          eq(Blogs.passed, true),
        ),
      )
      .limit(size)

    const result = randomBlogs.map((blog) => {
      return BlogVOSchema.parse(blog)
    })
    return Result.success(result)
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    } else if (e instanceof ZodError) {
      return Result.error('数据解析有误，请报告管理员进行处理', 500)
    }
    throw e
  }
})

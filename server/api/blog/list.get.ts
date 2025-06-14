import { and, eq, count, sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { ZodError, z } from 'zod'
import type { BlogVO } from '~/shared/types/blog'
import { BlogVOSchema } from '~/shared/types/blog'
import { db } from '~~/db/database'
import { Blogs } from '~~/db/schema/blogs'
import Result from '~~/server/result'

export interface ListResult {
  total: number
  data: BlogVO[]
  page: number
  pageSize: number
  totalPages: number
}

const QuerySchema = z.object({
  page: z.string().optional().default('1'),
  pageSize: z.string().optional().default('12'),
  content: z.string().optional(),
  main_tag: z.string().optional(),
  sub_tag: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const query = await getQuery(event)
    const { page, pageSize, content, main_tag, sub_tag } =
      QuerySchema.parse(query)

    const pageNum = parseInt(page)
    const pageSizeNum = parseInt(pageSize)
    const offset = (pageNum - 1) * pageSizeNum

    // 构建查询条件
    const conditions = [eq(Blogs.passed, true)]

    if (content) {
      conditions.push(
        sql`${Blogs.name} LIKE ${`%${content}%`} OR ${Blogs.url} LIKE ${`%${content}%`}`,
      )
    }

    if (main_tag && main_tag !== 'null' && main_tag !== '') {
      conditions.push(sql`${Blogs.main_tag} = ${main_tag}`)
    }

    if (sub_tag) {
      const subTags = sub_tag.split(',').filter(Boolean)
      if (subTags.length > 0) {
        conditions.push(sql`${Blogs.sub_tag} @> ${JSON.stringify(subTags)}`)
      }
    }

    const whereClause =
      conditions.length > 1 ? and(...conditions) : conditions[0]

    // 获取总数
    const [{ total }] = await db
      .select({ total: count() })
      .from(Blogs)
      .where(whereClause)

    // 获取分页数据
    const blogs = await db
      .select()
      .from(Blogs)
      .where(whereClause)
      .limit(pageSizeNum)
      .offset(offset)

    const result = blogs.map((blog) => {
      return BlogVOSchema.parse(blog)
    })

    const totalPages = Math.ceil(total / pageSizeNum)

    return Result.success({
      total,
      data: result,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages,
    } as ListResult)
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

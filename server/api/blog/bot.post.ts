import { eq, or } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { db } from '../../db/database'
import { BotUpdate } from '~/shared/types/blog'
import { PG_ERRORS } from '~~/server/db/error'
import { Blogs } from '~~/server/db/schema/blogs'
import { generateBID } from '~~/server/db/util'
import Result from '~~/server/result'

interface InsertResult {
  success: boolean
  type?: 'update' | 'insert'
  blog: { name: string; url: string }
  error?: string
}

const handleDatabaseError = (
  e: DatabaseError,
  blog: { name: string; url: string },
): InsertResult => {
  const errorDetails = {
    code: e.code,
    detail: e.detail,
    constraint: e.constraint,
    table: e.table,
    schema: e.schema,
  }
  console.error('数据库错误:', errorDetails)

  switch (e.code) {
    case PG_ERRORS.UNIQUE_VIOLATION: {
      const field = e.constraint?.includes('url')
        ? 'URL'
        : e.constraint?.includes('name')
          ? '名称'
          : '记录'
      return {
        success: false,
        blog,
        error: `该${field}已存在`,
      }
    }
    case PG_ERRORS.NOT_NULL_VIOLATION:
      return {
        success: false,
        blog,
        error: `缺少必要字段: ${e.column}`,
      }
    default:
      return {
        success: false,
        blog,
        error: '数据库操作失败',
      }
  }
}

export default defineEventHandler(async (event) => {
  // TODO: Automated Bot Script Verification
  const result = await readValidatedBody(event, (body) =>
    BotUpdate.safeParseAsync(body),
  )
  if (result.error) {
    const errors = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ')
    return Result.error(`数据验证失败: ${errors}`, 400)
  }
  const { blogs: insertBlogs } = result.data

  const processResults: InsertResult[] = []

  for (const blog of insertBlogs) {
    const result: InsertResult = {
      success: false,
      blog: { name: blog.name, url: blog.url },
    }
    try {
      await db.transaction(async (ts) => {
        const existing = await ts
          .selectDistinct()
          .from(Blogs)
          .where(or(eq(Blogs.name, blog.name), eq(Blogs.url, blog.url)))

        if (existing.length > 0) {
          await ts
            .update(Blogs)
            .set({
              ...blog,
            })
            .where(eq(Blogs.id, existing[0].id))
          result.type = 'update'
        } else {
          await db.insert(Blogs).values({
            ...blog,
            bid: await generateBID(),
          })
          result.type = 'insert'
        }
      })
      result.success = true
      processResults.push(result)
    } catch (e) {
      if (e instanceof DatabaseError) {
        processResults.push(
          handleDatabaseError(e, { name: blog.name, url: blog.url }),
        )
      } else {
        processResults.push({
          success: false,
          blog: { name: blog.name, url: blog.url },
          error: '未知错误',
        })
      }
    }
  }

  const successCount = processResults.filter((r) => r.success).length
  const failureCount = processResults.filter((r) => !r.success).length

  return Result.success({
    total: insertBlogs.length,
    success: successCount,
    failure: failureCount,
    details: processResults,
  })
})

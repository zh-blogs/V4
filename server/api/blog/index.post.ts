import { DatabaseError } from 'pg-protocol'
import { db } from '../../db/database'
import type { WebIntert } from '~/shared/types/blog'
import { WebSubmit } from '~/shared/types/blog'
import { PG_ERRORS } from '~~/server/db/error'
import { Blogs } from '~~/server/db/schema/blogs'
import Result from '~~/server/result'
import { generateBID } from '~~/server/db/util'

const handleDatabaseError = (e: DatabaseError) => {
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
      return Result.error(`该${field}已存在`, 409)
    }
    case PG_ERRORS.NOT_NULL_VIOLATION:
      return Result.error(`缺少必要字段: ${e.column}`, 400)
    default:
      return Result.error('数据库操作失败', 500)
  }
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    WebSubmit.safeParseAsync(body),
  )
  if (body.error) {
    const errors = body.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ')
    return Result.error(`数据验证失败: ${errors}`, 400)
  }
  const insertData: WebIntert = {
    ...body.data,
    bid: await generateBID(),
    from: ['SelfSubmit'],
  }

  console.log('自主提交数据:', {
    name: insertData.name,
    url: insertData.url,
    main_tag: insertData.main_tag,
    date: new Date(),
  })

  try {
    await db.insert(Blogs).values(insertData)
    return Result.success()
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseError(e)
    }
    throw e
  }
})

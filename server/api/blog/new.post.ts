import { DatabaseError } from 'pg-protocol'
import { db } from '~~/db/database'
import type { WebIntert } from '~/shared/types/blog'
import { WebSubmitSchema } from '~/shared/types/blog'
import { Blogs } from '~~/db/schema/blogs'
import Result from '~~/server/result'
import { handleDatabaseErrorResponse } from '~~/server/utils/handleDatabaseError'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    WebSubmitSchema.safeParseAsync(body),
  )

  if (body.error) {
    const errors = body.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ')
    return Result.error(`数据验证失败: ${errors}`, 400)
  }

  const insertData: WebIntert = {
    ...body.data,
    bid: null,
    from: ['WebSubmit'],
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
      return handleDatabaseErrorResponse(e)
    }
    throw e
  }
})

import { sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { db } from '~~/server/db/database'
import { Blogs } from '~~/server/db/schema/blogs'
import Result from '~~/server/result'
// 定义返回类型
export interface BlogStats {
  total: number
  accessible: number
  recommen: number
  passed: number
}

export default defineEventHandler(async () => {
  try {
    const [result] = await db
      .selectDistinct({
        total: sql`COUNT(${Blogs.bid}) `.as('total'),
        accessible:
          sql`COUNT(${Blogs.bid}) FILTER (WHERE ${Blogs.status} <> 'ERROR')`.as(
            'accessible',
          ),
        recommen:
          sql`COUNT(${Blogs.bid}) FILTER (WHERE ${Blogs.recommen} = true AND ${Blogs.status} = 'OK')`.as(
            'recommen',
          ),
        passed:
          sql`COUNT(${Blogs.bid}) FILTER (WHERE ${Blogs.passed} = true AND ${Blogs.status} = 'OK')`.as(
            'passed',
          ),
      })
      .from(Blogs)

    return Result.success(result as BlogStats)
  } catch (e) {
    if (e instanceof DatabaseError) {
      return handleDatabaseErrorResponse(e)
    }
    throw e
  }
})

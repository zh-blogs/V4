import { sql } from 'drizzle-orm'
import { DatabaseError } from 'pg-protocol'
import { db } from '~~/db/database'
import { Blogs } from '~~/db/schema/blogs'
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
      .select({
        total: sql`COUNT(${Blogs.id}) `.as('total'),
        accessible:
          sql`COUNT(${Blogs.id}) FILTER (WHERE ${Blogs.status} <> 'ERROR')`.as(
            'accessible',
          ),
        recommen:
          sql`COUNT(${Blogs.id}) FILTER (WHERE ${Blogs.recommen} = true)`.as(
            'recommen',
          ),
        passed:
          sql`COUNT(${Blogs.id}) FILTER (WHERE ${Blogs.passed} = true)`.as(
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

import { LibsqlError } from "@libsql/client/web"
import { sql } from "drizzle-orm"
import { ZodError } from "zod"
import { db } from "~~/server/db/database"
import { blogs } from "~~/server/db/schema"
import Result from "~~/server/result"
import { BotUpdate } from "~/shared/types/blog"

export default defineEventHandler(async (event) => {
  // TODO: Automated Bot Script Verification
  try {
    const result: BotUpdate = await readValidatedBody(event, body => BotUpdate.parse(body))
    const { blogs: insertBlogs } = result
    try {
      await db.insert(blogs)
        .values(insertBlogs)
        .onConflictDoUpdate({
          target: [blogs.name, blogs.url],
          set: {
            sign: sql`EXCLUDED.sign`,
            main_tag: sql`EXCLUDED.main_tag`,
            sub_tag: sql`EXCLUDED.sub_tag`,
            feed: sql`EXCLUDED.feed`,
            sitemap: sql`EXCLUDED.sitemap`,
            arch: sql`EXCLUDED.arch`,
            from: sql`EXCLUDED.from`,
            status: sql`EXCLUDED.status`,
            passed: sql`EXCLUDED.passed`,
            recommen: sql`EXCLUDED.recommen`,
            saveweb_id: sql`EXCLUDED.saveweb_id`,
            update_time: sql`NOW()`
          }
        })
      return Result.success()
    } catch (e) {
      if (e instanceof LibsqlError) {
        if (e.message.includes('SQLITE_CONSTRAINT_UNIQU')) {
          return Result.error('博客已存在', 400)
        }
      }
      console.error('未知错误:', e)
      return Result.error('系统错误（请上报管理员进行处理）：', 500)
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return Result.error(e.message)
    }
    console.error('未知错误:', e)
    return Result.error('系统错误（请上报管理员进行处理）：', 500)
  }
})

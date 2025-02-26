import { LibsqlError } from "@libsql/client/web"
import { ZodError } from "zod"
import { blogs } from "~~/server/db/schema"
import Result from "~~/server/result"
import { WebSubmit } from "~/shared/types/blog"
import { db } from "../../db/database"


export default defineEventHandler(async (event) => {
  try {
    const insertData = {
      ... await readValidatedBody(event, body => WebSubmit.parse(body)),
      from: ['SelfSubmit']
    }
    try {
      await db.insert(blogs).values(insertData)
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
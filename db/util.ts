import { count, eq } from 'drizzle-orm'
import { db } from './database'
import { Blogs } from './schema/blogs'
// TODO
export async function generateBID(): Promise<number> {
  const [result] = await db
    .select({ count: count() })
    .from(Blogs)
    .where(eq(Blogs.passed, true))
  return result.count + 100000
}

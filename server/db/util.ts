import { db } from "./database";
import { Blogs } from "./schema/blogs";

export async function generateBID(): Promise<number> {
  return await db.$count(Blogs) + 100001
}
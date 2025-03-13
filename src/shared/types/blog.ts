import { z } from 'zod'
import {
  FROM_SOURCES,
  MAIN_TAGS,
  STATUS_TYPES,
} from '~~/server/db/schema/blogs'

export type MainTag = (typeof MAIN_TAGS)[number]
export type StatusType = (typeof STATUS_TYPES)[number]
export type FromSource = (typeof FROM_SOURCES)[number]

export const BaseBlogSchema = z.object({
  id: z
    .string({ message: '不正确的数据格式' })
    .uuid({ message: '该字段为什么会不正确？' }),
  bid: z.number({ message: '该字段为什么会不正确？' }),
  name: z
    .string({ message: '不正确的数据格式' })
    .min(1, { message: '博客名称不得小于 1 字符' })
    .max(32, { message: '博客名称不得大于 32 字符' }),
  url: z
    .string({ message: '不正确的数据格式' })
    .url({ message: 'URL 格式不正确' })
    .max(64, { message: 'URL 长度不得超过 64 字符' }),
  sign: z.string({ message: '不正确的数据格式' }).default(''),
  main_tag: z.enum(MAIN_TAGS, {
    errorMap: () => ({ message: '无效的主标签类型' }),
  }),
  sub_tag: z
    .array(z.string({ message: '不正确的数据格式' }))
    .max(10)
    .default([]),
  feed: z
    .array(
      z.string({ message: '不正确的数据格式' }),
      // .url({ message: 'Feed URL 格式不正确' }),
      {
        errorMap: () => ({ message: '无效的 Feed URL 类型' }),
      },
    )
    .default([]),
  from: z
    .array(
      z.enum(FROM_SOURCES, {
        message: '来源不存在于预定数据中，请联系网站管理员进行处理',
      }),
      {
        errorMap: () => ({ message: '无效的数据来源类型' }),
      },
    )
    .min(1, { message: '数据来源不能为空' })
    .default(['WebSubmit']),
  sitemap: z
    .string({ message: '不正确的数据格式' })
    // .url({ message: 'Sitemap URL 格式不正确' })
    .max(128, { message: 'Sitemap URL 长度不得超过 128 字符' })
    .default(''),
  link_page: z
    .string()
    // .url({ message: '友链页面 URL 格式不正确' })
    .max(128, { message: '友链页面 URL 长度不得超过 128 字符' })
    .default(''),
  arch: z
    .string({ message: '不正确的数据格式' })
    .max(32, { message: '博客架构名称不超过 16 字符' })
    .default(''),
  status: z
    .enum(STATUS_TYPES, {
      errorMap: () => ({ message: '无效的状态码类型' }),
    })
    .default('OK'),
  passed: z.boolean().default(false),
  recommen: z.boolean().default(false),
  join_time: z.date().default(() => new Date()),
  update_time: z.date().default(() => new Date()),
  saveweb_id: z.string().default(''),
})

export type BaseBlog = z.infer<typeof BaseBlogSchema>

export const WebSubmitSchema = BaseBlogSchema.pick({
  name: true,
  url: true,
  sign: true,
  main_tag: true,
  sub_tag: true,
  feed: true,
  from: true,
  sitemap: true,
  link_page: true,
  arch: true,
})

export type WebSubmit = z.infer<typeof WebSubmitSchema>

export const WebIntertSchema = WebSubmitSchema.merge(
  BaseBlogSchema.pick({
    bid: true,
  }),
)

export type WebIntert = z.infer<typeof WebIntertSchema>

export const BotUpdateSchema = z.object({
  blogs: z.array(
    BaseBlogSchema.omit({
      id: true,
      arch: true,
      link_page: true,
      join_time: true,
      update_time: true,
      saveweb_id: true,
    }),
  ),
})

export type BotUpdate = z.infer<typeof BotUpdateSchema>

export const BotInsertSchema = BotUpdateSchema.merge(
  BaseBlogSchema.pick({
    bid: true,
  }),
)

export type BotInsert = z.infer<typeof WebIntertSchema>

export const BlogVOSchema = BaseBlogSchema.omit({
  id: true,
  link_page: true,
  passed: true,
  recommen: true,
  saveweb_id: true,
})

export type BlogVO = z.infer<typeof BlogVOSchema>

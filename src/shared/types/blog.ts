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
  sign: z.string({ message: '不正确的数据格式' }),
  main_tag: z.enum(MAIN_TAGS, {
    errorMap: () => ({ message: '无效的主标签类型' }),
  }),
  sub_tag: z.nullable(
    z
      .array(
        z
          .string({ message: '不正确的数据格式' })
          .min(1, { message: '空字符串是不能成为标签的哦' }),
      )
      .max(10),
  ),
  feed: z
    .array(
      z.object({
        name: z.string({
          message: '请对订阅链接进行必要的描述，如果只有一个，请写默认',
        }),
        url: z
          .string({ message: '不正确的数据格式' })
          .max(128, { message: 'Feed URL 长度不得超过 128 字符' })
          .refine(
            (arg) => {
              try {
                new URL(arg)
                return true
              } catch {
                return false
              }
            },
            {
              message: '请输入有效的 URL 地址',
            },
          ),
      }),
      // {
      //   errorMap: () => ({ message: '无效的 Feed URL 类型' }),
      // },
    )
    .nullable(),
  from: z
    .array(
      z.enum(FROM_SOURCES, {
        message: '来源不存在于预定数据中，请联系网站管理员进行处理',
      }),
      {
        errorMap: () => ({ message: '无效的数据来源类型' }),
      },
    )
    .min(1, { message: '数据来源不能为空' }),
  sitemap: z
    .string({ message: '不正确的数据格式' })
    .max(128, { message: 'Feed URL 长度不得超过 128 字符' })
    .nullable()
    .refine(
      (arg) => {
        if (arg === null) {
          return true
        } else if (arg === '') {
          return false
        }
        try {
          new URL(arg)
          return true
        } catch {
          return false
        }
      },
      {
        message: '请输入有效的 URL 地址',
      },
    ),
  link_page: z
    .string({ message: '不正确的数据格式' })
    .max(128, { message: 'Feed URL 长度不得超过 128 字符' })
    .nullable()
    .refine(
      (arg) => {
        if (arg === null) {
          return true
        } else if (arg === '') {
          return false
        }
        try {
          new URL(arg)
          return true
        } catch {
          return false
        }
      },
      {
        message: '请输入有效的 URL 地址',
      },
    ),
  arch: z
    .string({ message: '不正确的数据格式' })
    .max(32, { message: '博客架构名称不超过 16 字符' }),
  status: z.enum(STATUS_TYPES, {
    errorMap: () => ({ message: '无效的状态码类型' }),
  }),
  passed: z.boolean(),
  recommen: z.boolean(),
  join_time: z.date(),
  update_time: z.date(),
  saveweb_id: z.string(),
  access_count: z.number(),
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
      access_count: true,
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

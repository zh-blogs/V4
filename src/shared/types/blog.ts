import { z } from "zod";

const mainTagEnum = ['生活', '技术', '知识', '整合', '采集', '综合', ''] as const;

const BID = z.object({
  bid: z.number()
})

export const WebSubmit = z.object({
  name: z.string().min(1).max(256),
  url: z.string().url().max(256),
  sign: z.string().default(''),
  main_tag: z.enum(mainTagEnum),
  sub_tag: z.array(z.string()).default([]),
  feed: z.array(z.string()).default([]),
  from: z.array(z.string()).default(['SelfSubmit']),
  sitemap: z.string().max(256).default(''),
  link_page: z.string().max(256).default(''),
  arch: z.string().max(128).default(''),
  // TODO: saveweb_id: z.string().max(256).default(''),
})

export type WebIntert = z.infer<typeof WebSubmit> & z.infer<typeof BID>

export const BotUpdate = z.object({
  blogs: z.array(z.object({
    name: z.string().min(1).max(256),
    url: z.string().url().max(256),
    sign: z.string().default(''),
    main_tag: z.enum(mainTagEnum),
    sub_tag: z.array(z.string()).default([]),
    feed: z.array(z.string()).default([]),
    from: z.array(z.string()),
    status: z.string().max(64).default('OK'),
    passed: z.boolean().default(false),
    recommen: z.boolean().default(false),
    sitemap: z.string().max(256).default(''),
    arch: z.string().max(128).default(''),
    // TODO: saveweb_id: z.string().max(256).default(''),
  }))
})

export type BotInsert = z.infer<typeof BotUpdate> & z.infer<typeof BID>
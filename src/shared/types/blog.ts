import { createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { blogs } from "~~/server/db/schema";

export const WebSubmit = z.object({
  name: z.string(),
  url: z.string().url(),
  sign: z.string(),
  main_tag: z.string(),
  sub_tag: z.array(z.string()).optional(),
  feed: z.array(z.string()).optional(),
  sitemap: z.string().optional(),
  arch: z.string().optional(),
  link_page: z.string().optional(),
  saveweb_id: z.string().optional(),
  from: z.array(z.string()).optional(),
})

export type WebSubmit = z.infer<typeof WebSubmit>

export const BotUpdate = z.object({
  blogs: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    sign: z.string().optional(),
    main_tag: z.string().optional(),
    sub_tag: z.array(z.string()).optional(),
    feed: z.array(z.string()).optional(),
    sitemap: z.string().optional(),
    arch: z.string().optional(),
    from: z.array(z.string()),
    status: z.string(),
    passed: z.boolean(),
    recommen: z.boolean().optional(),
    saveweb_id: z.string().optional(),
  }))
})

export type BotUpdate = z.infer<typeof BotUpdate>
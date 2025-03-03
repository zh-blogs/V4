import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    page: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        create: z.date(),
        update: z.date(),
        editor: z.array(z.string()),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        top: z.boolean(),
        date: z.date(),
        tags: z.array(z.string()),
        category: z.string(),
      }),
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        create: z.date(),
        update: z.date(),
        editor: z.array(z.string()),
      }),
    }),
  },
})

import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections:{
    page: defineCollection({
      type: 'page',
      source:'/*.md',
    }),
    blog: defineCollection({
      type:'page',
      source:'blog/*.md'
    }),
    docs:defineCollection({
      type:'page',
      source:"docs/*.md"
    })
  }
})
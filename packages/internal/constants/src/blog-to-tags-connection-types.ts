/**
 * @file blog-to-tags-connection-types.ts
 * @description 定义博客与标签连接类型常量
 */

export enum BLOG_TO_TAGS_CONNECTION_TYPES {
  SUBMISSION = "提交表关联",
  MAIN = "博客主表关联",
}

export const BLOG_TO_TAGS_CONNECTION_TYPE_KEYS = Object.keys(BLOG_TO_TAGS_CONNECTION_TYPES) as (keyof typeof BLOG_TO_TAGS_CONNECTION_TYPES)[];
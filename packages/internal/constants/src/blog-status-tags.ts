/**
 * @file blog-status-tags.ts
 * @description 博客状态标签常量
 */

export enum BLOG_STATUS_TAGS {
  EXTERNAL_LIMIT = "外部限制",
  INTERNAL_LIMIT = "内部限制",
  FEW_ARTICLES = "文章较少",
  NO_CONTENT = "无内容",
  NON_ORIGINAL = "非原创",
  SENSITIVE_CONTENT = "敏感内容",
}

export const BLOG_STATUS_TAG_KEYS = Object.keys(
  BLOG_STATUS_TAGS
) as (keyof typeof BLOG_STATUS_TAGS)[];

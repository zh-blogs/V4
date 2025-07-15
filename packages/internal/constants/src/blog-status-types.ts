/**
 * @file blog-status-types.ts
 * @description 博客状态类型常量
 */

export enum BLOG_STATUS_TYPES {
  OK = "状态正常",
  ERROR = "状态异常",
  SSLERROR = "SSL证书错误",
}

export const BLOG_STATUS_TYPE_KEYS = Object.keys(BLOG_STATUS_TYPES) as (keyof typeof BLOG_STATUS_TYPES)[];

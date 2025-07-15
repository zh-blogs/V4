/**
 * @file architecture-types.ts
 * @description 定义架构类型常量
 */

export enum ARCHITECTURE_TYPES {
  CMS = "内容管理系统",
  SSG = "静态站点生成器",
  FRAMEWORK = "技术框架",
  UNKNOWN = "未知架构",
}

export const ARCHITECTURE_TYPE_KEYS = Object.keys(ARCHITECTURE_TYPES) as (keyof typeof ARCHITECTURE_TYPES)[];

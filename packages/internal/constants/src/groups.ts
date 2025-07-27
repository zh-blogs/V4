/**
 * @file groups.ts
 * @description 定义身份组常量
 */

export enum GROUPS {
  PROJECT = "项目组",
  TECH = "技术组",
  DOCS = "文档维护组",
  DATA = "数据维护组",
  OUTREACH = "外联组",
}

export const GROUP_KEYS = Object.keys(GROUPS) as (keyof typeof GROUPS)[];

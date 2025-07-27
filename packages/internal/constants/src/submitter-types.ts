/**
 * @file submitter-types.ts
 * @description 定义提交者类型常量
 */

export enum SUBMITTER_TYPES {
  GUEST = "访客",
  USER = "用户",
  ROBOT = "机器人",
  UNKNOWN = "未知",
}

export const SUBMITTER_TYPE_KEYS = Object.keys(SUBMITTER_TYPES) as (keyof typeof SUBMITTER_TYPES)[];

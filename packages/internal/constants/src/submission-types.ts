/**
 * @file submission-types.ts
 * @description 定义提交类型常量
 */

export enum SUBMISSION_TYPES {
  CREATE = "新增",
  CLAIM = "认领",
  MODIFY = "修改",
  DELETE = "删除",
  NOTICE = "通知",
}

export const SUBMISSION_TYPE_KEYS = Object.keys(SUBMISSION_TYPES) as (keyof typeof SUBMISSION_TYPES)[];

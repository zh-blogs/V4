/**
 * @file tag-types.ts
 * @description 定义标签类型常量
 */

export enum TAG_TYPES {
  MAIN = "主标签",
  SUB = "子标签",
}

export const TAG_TYPE_KEYS = Object.keys(TAG_TYPES) as (keyof typeof TAG_TYPES)[]
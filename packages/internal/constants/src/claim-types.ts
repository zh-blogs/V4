/**
 * @file claim-types.ts
 * @description 定义认领类型常量名称
 */

export enum CLAIM_TYPES {
  OWNER = "所有者认领",
  ADMIN = "管理员认证",
}

export const CLAIM_TYPE_KEYS = Object.keys(
  CLAIM_TYPES
) as (keyof typeof CLAIM_TYPES)[];

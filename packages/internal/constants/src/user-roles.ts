/**
 * @file user-roles.ts
 * @description 定义用户角色常量
 */

export enum USER_ROLES {
  SYS_ADMIN = "系统管理员",
  ADMIN = "管理员",
  CONTRIBUTOR = "贡献者",
  USER = "普通用户",
}

export const USER_ROLE_KEYS = Object.keys(USER_ROLES) as (keyof typeof USER_ROLES)[]

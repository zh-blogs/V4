/**
 * @file identities.ts
 * @description 定义身份标识常量
 */

export enum IDENTITIES {
  LEADER = "项目负责人",
  CORE = "核心贡献者",
  CONTRIBUTOR = "贡献者",
}

export const IDENTITY_KEYS = Object.keys(IDENTITIES) as (keyof typeof IDENTITIES)[];

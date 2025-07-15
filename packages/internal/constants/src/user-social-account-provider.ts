/**
 * @file provider.ts
 * @description 定义社交账号提供商常量
 */

export enum USER_SOCIAL_ACCOUNT_PROVIDERS {
  GITHUB = "GitHub",
}

export const USER_SOCIAL_ACCOUNT_PROVIDERS_KEYS = Object.keys(
  USER_SOCIAL_ACCOUNT_PROVIDERS
) as (keyof typeof USER_SOCIAL_ACCOUNT_PROVIDERS)[];

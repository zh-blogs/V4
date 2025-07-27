/**
 * @file github-webhook-logs-status-types.ts
 * @description 定义 GitHub Webhook 触发的部署状态类型常量
 */

export enum GITHUB_WEBHOOK_LOGS_STATUS_TYPES {
  SUCCESS = "success", // 成功
  FAILURE = "failure", // 失败
  MANUAL_INTERVENTION = "manual_intervention", // 手动干预
}

export const GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS = Object.keys(GITHUB_WEBHOOK_LOGS_STATUS_TYPES) as (keyof typeof GITHUB_WEBHOOK_LOGS_STATUS_TYPES)[];

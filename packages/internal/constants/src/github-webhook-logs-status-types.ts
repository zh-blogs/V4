/**
 * @file github-webhook-logs-status-types.ts
 * @description 定义 GitHub Webhook 触发的部署状态类型常量
 */

export enum GITHUB_WEBHOOK_LOGS_STATUS_TYPES {
  SUCCESS = "成功",
  FAILURE = "失败",
  NO_CHANGES = "无变更",
  ENV_CHANGED = "环境变量变更",
}

export const GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS = Object.keys(
  GITHUB_WEBHOOK_LOGS_STATUS_TYPES
) as (keyof typeof GITHUB_WEBHOOK_LOGS_STATUS_TYPES)[];

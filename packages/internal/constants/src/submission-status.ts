/**
 * @file submission-status.ts
 * @description 定义提交状态常量
 */

export enum SUBMISSION_STATUS {
  PENDING = "待处理",
  APPROVED = "已批准",
  REJECTED = "已拒绝",
}

export const SUBMISSION_STATUS_KEYS = Object.keys(SUBMISSION_STATUS) as (keyof typeof SUBMISSION_STATUS)[];

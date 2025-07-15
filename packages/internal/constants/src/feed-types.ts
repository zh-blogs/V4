/**
 * @file feed_types.ts
 * @description 订阅链接类型常量
 */

export enum FEED_TYPE {
  RSS = "RSS",
  ATOM = "ATOM",
  JSON = "JSON",
}

export const FEED_TYPE_KEYS = Object.keys(FEED_TYPE) as string[];

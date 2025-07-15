/**
 * @file frome-sources.ts
 * @description 定义博客来源常量
 */

export enum FROM_SOURCES {
  // 合作数据源
  CIB = "中文独立博客列表",
  BoYouQuan = "博友圈",
  BlogFinder = "BlogFinder",
  BKZ = "优秀个人独立博客导航",
  Travellings = "开往",
  // 其他来源
  LinkPage = "友链发现",
  WebSubmit = "网页提交",
  OldData = "旧版数据迁移",
  Claimed = "已认领",
}

export const FROM_SOURCE_KEYS = Object.keys(FROM_SOURCES) as (keyof typeof FROM_SOURCES)[];

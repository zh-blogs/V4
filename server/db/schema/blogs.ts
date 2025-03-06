import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'

export const mainTagsEnum = pgEnum('main_tag', [
  '生活',
  '技术',
  '知识',
  '整合',
  '采集',
  '综合',
  '',
])
export const fromSources = pgEnum('from', [
  'CIB',
  'BoYouQuan',
  'BlogFinder',
  'BKZ',
  'Travellings',
  'WebSubmit',
  'AdminAdd',
  'LinkPageSearch',
])
export const statusTypes = pgEnum('status', ['OK', 'ERROR', 'DELETED'])

export const Blogs = pgTable(
  'blogs',
  {
    id: uuid()
      .$default(() => v7())
      .primaryKey(),
    bid: integer().unique().notNull(),
    name: varchar({ length: 16 }).unique().notNull(),
    url: varchar({ length: 64 }).unique().notNull(),
    sign: text().default(''),
    main_tag: mainTagsEnum(),
    sub_tag: jsonb().$type<string[]>().default([]),
    feed: jsonb().$type<string[]>().default([]),
    from: fromSources().$type<string[]>().default([]),
    sitemap: varchar({ length: 128 }).default(''),
    link_page: varchar({ length: 128 }).default(''),
    arch: varchar({ length: 32 }).default(''),
    join_time: timestamp({ withTimezone: true, precision: 6 }).$default(
      () => new Date(),
    ),
    update_time: timestamp({ withTimezone: true, precision: 6 })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
    status: statusTypes().default('OK'),
    passed: boolean().default(false),
    recommen: boolean().default(false),
    // TODO: saveweb_id: varchar({ length: 256 }),
  },
  (table) => [
    uniqueIndex('id_index').on(table.id),
    uniqueIndex('bid_index').on(table.bid),
    uniqueIndex('name_index').on(table.name),
    uniqueIndex('url_index').on(table.url),
    index('main_tag_index').on(table.main_tag),
    index('sub_tag_index').on(table.sub_tag),
  ],
)

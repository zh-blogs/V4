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
import { FROM_SOURCES, MAIN_TAGS, STATUS_TYPES } from '~/shared/types/blog'

export const mainTagsEnum = pgEnum('main_tag_enum', MAIN_TAGS)
export const fromSources = pgEnum('from_enum', FROM_SOURCES)
export const statusTypes = pgEnum('status_enum', STATUS_TYPES)

export const Blogs = pgTable(
  'blogs',
  {
    id: uuid()
      .$default(() => v7())
      .primaryKey(),
    bid: integer().unique().notNull(),
    name: varchar({ length: 32 }).unique().notNull(),
    url: varchar({ length: 64 }).unique().notNull(),
    sign: text().default(''),
    main_tag: mainTagsEnum(),
    sub_tag: jsonb().$type<string[]>().default([]),
    feed: jsonb().$type<string[]>().default([]),
    from: fromSources().array(),
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

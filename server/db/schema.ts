import * as type from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const blogs = sqliteTable(
  'blogs',
  {
    id: type.integer({ mode: 'number' }).primaryKey({ autoIncrement: true }).unique(),
    idx: type.text().$default(() => uuid()).unique().notNull(),
    name: type.text().unique().notNull(),
    url: type.text().unique().notNull(),
    sign: type.text().default(''),
    main_tag: type.text().default(''),
    from: type.text({ mode: 'json' }).$type<string[]>().notNull(),
    sub_tag: type.text({ mode: 'json' }).$type<string[]>().default([]),
    feed: type.text({ mode: 'json' }).$type<string[]>().default([]),
    sitemap: type.text().default(''),
    arch: type.text().default(''),
    link_page: type.text().default(''),
    join_time: type.integer('join_time', { mode: 'timestamp_ms' }).$default(() => new Date()),
    update_time: type.integer('update_time', { mode: 'timestamp_ms' }).$default(() => new Date()).$onUpdate(() => new Date()),
    status: type.text().default('OK').notNull(),
    passed: type.integer({ mode: 'boolean' }).default(false).notNull(),
    recommen: type.integer({ mode: 'boolean' }).default(false).notNull(),
    saveweb_id: type.text().unique().default(''),
  },
  (table) => [
    type.uniqueIndex('id_index').on(table.id),
    type.uniqueIndex('idx_index').on(table.idx),
    type.uniqueIndex('name_index').on(table.name),
    type.uniqueIndex('url_index').on(table.url),
    type.index('main_tag_index').on(table.main_tag),
    type.index('sub_tag_index').on(table.sub_tag)
  ]
);

import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { Architectures } from "./architectures";
import { FeedInfo } from "@/types/schema-types";
import {
  blog_status_enum,
  blog_status_tag_enum,
  claimed_by_enum,
  from_source_enum,
} from "./enums";
import { Users } from "./users";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod/v4";

export const Blogs = pgTable(
  "blogs",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    bid: varchar({ length: 16 }).unique(),
    name: varchar({ length: 64 }).notNull(),
    url: varchar({ length: 128 }).notNull(),
    sign: varchar({ length: 256 }),
    feed: jsonb().$type<FeedInfo[]>(),
    sitemap: varchar({ length: 256 }),
    link_page: varchar({ length: 256 }),
    architecture: integer().references(() => Architectures.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    join_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
    update_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    from: from_source_enum().array().notNull(),
    blog_status: blog_status_enum().default("OK"),
    blog_status_tags: blog_status_tag_enum().array().default([]),
    is_recommend: boolean().notNull().default(false),
    access_count: integer().notNull().default(0),
    owner_id: uuid().references(() => Users.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    is_deleted: boolean().notNull().default(false),
    is_show: boolean().notNull().default(true),
    weight: decimal({ precision: 6, scale: 3 }).notNull().default("0.000"),
    claimed_by: claimed_by_enum(),
  },
  (table) => [
    uniqueIndex("blogs_id_index").on(table.id),
    uniqueIndex("blogs_bid_index").on(table.bid),
    uniqueIndex("blogs_name_index").on(table.name),
    uniqueIndex("blogs_url_index").on(table.url),
    uniqueIndex("blogs_owner_id_index").on(table.owner_id),
    index("blogs_architecture_index").on(table.architecture),
    index("blogs_weight_index").on(table.weight),
    index("blogs_from_index").on(table.from),
    index("blogs_blog_status_index").on(table.blog_status),
    index("blogs_is_recommend_index").on(table.is_recommend),
    index("blogs_access_count_index").on(table.access_count),
    index("blogs_join_time_index").on(table.join_time.desc()),
    index("blogs_is_deleted_index").on(table.is_deleted),
    index("blogs_claim_by_index").on(table.claimed_by),
    index("blogs_update_time_index").on(table.update_time.desc()),
    uniqueIndex("blogs_name_url_index").on(table.name, table.url),
    index("blogs_show_status_index").on(table.is_show, table.blog_status),
    index("blogs_recommendation_status_index").on(
      table.is_recommend,
      table.blog_status
    ),
    index("blogs_status_tags_index").on(table.blog_status_tags),
    index("blogs_status_recommendation_weight_index").on(
      table.blog_status,
      table.is_recommend,
      table.weight.desc()
    ),
    index("blogs_status_recommendation_weight_access_index").on(
      table.blog_status,
      table.is_recommend,
      table.weight.desc(),
      table.access_count.desc()
    ),
  ]
);

export const BlogSelectSchema = createSelectSchema(Blogs);
export const BlogInsertSchema = createInsertSchema(Blogs);
export const BlogUpdateSchema = createUpdateSchema(Blogs);

export type BlogSelect = z.infer<typeof BlogSelectSchema>;
export type BlogInsert = z.infer<typeof BlogInsertSchema>;
export type BlogUpdate = z.infer<typeof BlogUpdateSchema>;

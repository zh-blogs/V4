import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { Blogs } from "./blogs";

export const Blog_Feeds = pgTable(
  "blog_feeds",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    blog_id: uuid().references(() => Blogs.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    title: varchar({ length: 128 }).notNull(),
    link: varchar({ length: 2048 }).notNull(),
    description: varchar({ length: 2048 }),
    publish_date: timestamp({ withTimezone: true, precision: 3 }),
  },
  (table) => [
    uniqueIndex("blog_feeds_id_index").on(table.id),
    index("blog_feeds_title_index").on(table.title),
    uniqueIndex("blog_feeds_blog_id_link_index").on(table.blog_id, table.link),
    uniqueIndex("blog_feeds_title_link_index").on(table.title, table.link),
    index("blog_feeds_blog_id_title_index").on(table.blog_id, table.title),
    index("blog_feeds_publish_date_index").on(table.publish_date.desc()),
    index("blog_feeds_blog_id_publish_date_index").on(
      table.blog_id,
      table.publish_date.desc()
    ),
  ]
);

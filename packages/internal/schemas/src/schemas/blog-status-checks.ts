import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { Blogs } from "./blogs";
import { blog_status_enum } from "./enums";

export const BlogStatusChecks = pgTable(
  "blog_status_checks",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    blog_id: uuid().references(() => Blogs.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    blog_status: blog_status_enum().notNull(),
    message: varchar({ length: 256 }).notNull(),
    duration: integer().notNull(),
    check_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("blog_status_checks_id_index").on(table.id),
    index("blog_status_checks_blog_id_index").on(table.blog_id),
    index("blog_status_checks_blog_id_check_time_index").on(
      table.blog_id,
      table.check_time.desc()
    ),
    index("blog_status_checks_status_time_index").on(
      table.blog_status,
      table.check_time.desc()
    ),
    index("blog_status_checks_status_duration_time_index").on(
      table.blog_status,
      table.duration.desc(),
      table.check_time.desc()
    ),
    index("blog_status_checks_blog_status_duration_index").on(
      table.blog_id,
      table.blog_status,
      table.duration.desc()
    ),
  ]
);

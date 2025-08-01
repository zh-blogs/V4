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
import { isValidUrl } from "@zhblogs/utils/psl";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z, { ZodString } from "zod/v4";

export const BlogFeeds = pgTable(
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
    publish_time: timestamp({ withTimezone: true, precision: 3 }),
    collection_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .$default(() => new Date()),
  },
  (table) => [
    uniqueIndex("blog_feeds_id_index").on(table.id),
    index("blog_feeds_title_index").on(table.title),
    uniqueIndex("blog_feeds_blog_id_link_index").on(table.blog_id, table.link),
    uniqueIndex("blog_feeds_title_link_index").on(table.title, table.link),
    index("blog_feeds_blog_id_title_index").on(table.blog_id, table.title),
    index("blog_feeds_publish_time_index").on(table.publish_time.desc()),
    index("blog_feeds_collection_time_index").on(table.collection_time.desc()),
    index("blog_feeds_blog_id_publish_time_index").on(
      table.blog_id,
      table.publish_time.desc()
    ),
  ]
);

const blogFeedRefine = {
  link: (schema: ZodString) =>
    schema.refine((value) => {
      return isValidUrl(value);
    }),
};

export const BlogFeedSelectSchema = createSelectSchema(
  BlogFeeds,
  blogFeedRefine
);
export const BlogFeedInsertSchema = createInsertSchema(
  BlogFeeds,
  blogFeedRefine
);
export const BlogFeedUpdateSchema = createUpdateSchema(
  BlogFeeds,
  blogFeedRefine
);

export type BlogFeedSelect = z.infer<typeof BlogFeedSelectSchema>;
export type BlogFeedInsert = z.infer<typeof BlogFeedInsertSchema>;
export type BlogFeedUpdate = z.infer<typeof BlogFeedUpdateSchema>;

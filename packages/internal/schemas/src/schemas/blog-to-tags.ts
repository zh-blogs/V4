import {
  index,
  integer,
  pgTable,
  primaryKey,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { Blogs } from "./blogs";
import { Tags } from "./tags";

export const Blog_To_Tags = pgTable(
  "blog_to_tags",
  {
    blog_id: uuid().references(() => Blogs.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    tag_id: integer().references(() => Tags.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    uniqueIndex("blog_tags_unique_index").on(table.blog_id, table.tag_id),
    index("blog_tags_blog_index").on(table.blog_id),
    index("blog_tags_tag_index").on(table.tag_id),
    primaryKey({
      name: "blog_tags_pkey",
      columns: [table.blog_id, table.tag_id],
    }),
  ]
);

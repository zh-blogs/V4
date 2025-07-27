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
import { blog_to_tags_connection_type_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod/v4";

export const BlogToTags = pgTable(
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
    connecrion_type: blog_to_tags_connection_type_enum().notNull(),
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

export const BlogToTagSelectSchema = createSelectSchema(BlogToTags);
export const BlogToTagInsertSchema = createInsertSchema(BlogToTags);
export const BlogToTagUpdateSchema = createUpdateSchema(BlogToTags);

export type BlogToTagSelect = z.infer<typeof BlogToTagSelectSchema>;
export type BlogToTagInsert = z.infer<typeof BlogToTagInsertSchema>;
export type BlogToTagUpdate = z.infer<typeof BlogToTagUpdateSchema>;

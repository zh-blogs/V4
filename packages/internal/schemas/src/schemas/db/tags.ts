import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { tag_type_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod/v4";

export const Tags = pgTable(
  "tags",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
    name: varchar({ length: 32 }).unique().notNull(),
    type: tag_type_enum().notNull(),
    description: varchar({ length: 512 }).notNull(),
    count: integer().notNull().default(0),
    created_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow(),
    updated_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("tags_id_index").on(table.id),
    uniqueIndex("tags_name_index").on(table.name),
    index("tags_count_index").on(table.count.desc()),
    index("tags_type_index").on(table.type),
    index("tags_type_name_index").on(table.type, table.name),
  ]
);

export const TagSelectSchema = createSelectSchema(Tags);
export const TagInsertSchema = createInsertSchema(Tags);
export const TagUpdateSchema = createUpdateSchema(Tags);

export type TagSelect = z.infer<typeof TagSelectSchema>;
export type TagInsert = z.infer<typeof TagInsertSchema>;
export type TagUpdate = z.infer<typeof TagUpdateSchema>;

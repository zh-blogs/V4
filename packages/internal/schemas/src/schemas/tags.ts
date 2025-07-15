import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { tag_type_enum } from "./enums";

export const Tags = pgTable(
  "tags",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
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

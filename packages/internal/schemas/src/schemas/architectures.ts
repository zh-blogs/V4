import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { architecture_type_enum } from "./enums";

export const Architectures = pgTable(
  "architectures",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
    name: varchar({ length: 32 }).unique().notNull(),
    description: varchar({ length: 256 }),
    architecture_type: architecture_type_enum().notNull(),
    url: varchar({ length: 128 }),
    logo_url: varchar({ length: 256 }),
    count: integer().default(0),
    create_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow(),
    update_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("architectures_id_index").on(table.id),
    uniqueIndex("architectures_name_index").on(table.name),
    uniqueIndex("architectures_url_index").on(table.url),
    index("architectures_count_index").on(table.count.desc()),
    index("architectures_type_index").on(table.architecture_type),
  ]
);

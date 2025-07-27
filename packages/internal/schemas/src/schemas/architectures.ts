import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { architecture_type_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { isValidUrl } from "@zhblogs/utils/psl";
import { z, ZodString } from "zod/v4";

export const Architectures = pgTable(
  "architectures",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
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

const architectureRefine = {
  url: (schema: ZodString) =>
    schema
      .refine((value) => {
        return isValidUrl(value);
      })
      .optional(),
  logo_url: (schema: ZodString) =>
    schema
      .refine((value) => {
        return isValidUrl(value);
      })
      .optional(),
};

export const ArchitectureSelectSchema = createSelectSchema(
  Architectures,
  architectureRefine
);
export const ArchitectureInsertSchema = createInsertSchema(
  Architectures,
  architectureRefine
);
export const ArchitectureUpdateSchema = createUpdateSchema(
  Architectures,
  architectureRefine
);

export type ArchitectureSelect = z.infer<typeof ArchitectureSelectSchema>;
export type ArchitectureInsert = z.infer<typeof ArchitectureInsertSchema>;
export type ArchitectureUpdate = z.infer<typeof ArchitectureUpdateSchema>;

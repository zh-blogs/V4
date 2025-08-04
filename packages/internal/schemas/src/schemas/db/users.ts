import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { user_role_enum } from "./enums";

export const Users = pgTable(
  "users",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    username: varchar({ length: 64 }).notNull().unique(),
    nickname: varchar({ length: 64 }).notNull(),
    email: varchar({ length: 128 }).notNull().unique(),
    password: varchar({ length: 256 }).notNull(),
    avatar: varchar({ length: 256 }),
    role: user_role_enum().notNull().default("USER"),
    login_count: integer().notNull().default(0),
    last_login_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow(),
    create_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow(),
    update_time: timestamp({ withTimezone: true, precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    is_active: boolean().notNull().default(true),
    is_verified: boolean().notNull().default(false),
  },
  (table) => [
    uniqueIndex("users_id_index").on(table.id),
    uniqueIndex("users_username_index").on(table.username),
    uniqueIndex("users_email_index").on(table.email),
    index("users_role_index").on(table.role),
    index("users_active_verified_index").on(table.is_active, table.is_verified),
    uniqueIndex("users_email_password_index").on(table.email, table.password),
    uniqueIndex("users_username_password_index").on(
      table.username,
      table.password
    ),
  ]
);

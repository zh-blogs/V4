import {
  bigint,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { github_webhook_logs_status_type_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod/v4";

export const GithubWebhookLogs = pgTable(
  "github_webhook_logs",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
    delivery_id: uuid().notNull(),
    workflow_run_id: bigint({ mode: "number" }).notNull(),
    workflow_run_url: varchar({ length: 256 }).notNull(),
    workflow_run_created_time: timestamp({
      withTimezone: true,
      precision: 3,
    }).notNull(),
    workflow_run_updated_time: timestamp({
      withTimezone: true,
      precision: 3,
    }).notNull(),
    workflow_run_run_started_time: timestamp({
      withTimezone: true,
      precision: 3,
    }).notNull(),
    actor_id: bigint({ mode: "number" }).notNull(),
    actor_username: varchar({ length: 64 }).notNull(),
    actor_url: varchar({ length: 256 }).notNull(),
    triggering_actor_id: bigint({ mode: "number" }).notNull(),
    triggering_actor_username: varchar({ length: 64 }).notNull(),
    triggering_actor_url: varchar({ length: 256 }).notNull(),
    commit_id: varchar({ length: 40 }).notNull(),
    commit_message: varchar({ length: 512 }).notNull(),
    commit_author_name: varchar({ length: 64 }).notNull(),
    received_webhook_time: timestamp({
      withTimezone: true,
      precision: 3,
    })
      .notNull()
      .defaultNow(),
    finished_time: timestamp({
      withTimezone: true,
      precision: 3,
    }).notNull(),
    status: github_webhook_logs_status_type_enum().notNull(),
    logs: jsonb().notNull(),
  },
  (table) => [
    index("github_webhook_logs_id_index").on(table.id),
    index("github_webhook_logs_status_index").on(table.status),
    index("github_webhook_logs_workflow_run_created_time_index").on(
      table.workflow_run_created_time.desc()
    ),
    index("github_webhook_logs_workflow_run_updated_time_index").on(
      table.workflow_run_updated_time.desc()
    ),
    index("github_webhook_logs_workflow_run_run_started_time_index").on(
      table.workflow_run_run_started_time.desc()
    ),
    index("github_webhook_logs_received_webhook_time_index").on(
      table.received_webhook_time.desc()
    ),
    index("github_webhook_logs_finished_time_index").on(
      table.finished_time.desc()
    ),
  ]
);

export const GithubWebhookLogSelectSchema =
  createSelectSchema(GithubWebhookLogs);
export const GithubWebhookLogInsertSchema =
  createInsertSchema(GithubWebhookLogs);
export const GithubWebhookLogUpdateSchema =
  createUpdateSchema(GithubWebhookLogs);

export type GithubWebhookLogSelect = z.infer<
  typeof GithubWebhookLogSelectSchema
>;
export type GithubWebhookLogInsert = z.infer<
  typeof GithubWebhookLogInsertSchema
>;
export type GithubWebhookLogUpdate = z.infer<
  typeof GithubWebhookLogUpdateSchema
>;

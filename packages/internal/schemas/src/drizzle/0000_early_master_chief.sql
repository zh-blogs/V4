CREATE TYPE "public"."architecture_type" AS ENUM('CMS', 'SSG', 'FRAMEWORK', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."blog_status" AS ENUM('OK', 'ERROR', 'SSLERROR');--> statement-breakpoint
CREATE TYPE "public"."blog_status_tags" AS ENUM('EXTERNAL_LIMIT', 'INTERNAL_LIMIT', 'FEW_ARTICLES', 'NO_CONTENT', 'NON_ORIGINAL', 'SENSITIVE_CONTENT');--> statement-breakpoint
CREATE TYPE "public"."from_sources" AS ENUM('CIB', 'BoYouQuan', 'BlogFinder', 'BKZ', 'Travellings', 'LinkPage', 'WebSubmit', 'OldData', 'Claimed');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('CREATE', 'CLAIM', 'MODIFY', 'DELETE', 'NOTICE');--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('CREATE', 'CLAIM', 'MODIFY', 'DELETE', 'NOTICE');--> statement-breakpoint
CREATE TYPE "public"."submitter_type" AS ENUM('GUEST', 'USER', 'ROBOT', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."tag_type" AS ENUM('MAIN', 'SUB');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('SYS_ADMIN', 'ADMIN', 'CONTRIBUTOR', 'USER');--> statement-breakpoint
CREATE TYPE "public"."user_social_account_provider" AS ENUM('GITHUB');--> statement-breakpoint
CREATE TABLE "architectures" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "architectures_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(32) NOT NULL,
	"description" varchar(256),
	"architecture_type" "architecture_type" NOT NULL,
	"url" varchar(128),
	"logo_url" varchar(256),
	"count" integer DEFAULT 0,
	"create_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"update_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "architectures_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "blog_feeds" (
	"id" uuid PRIMARY KEY NOT NULL,
	"blog_id" uuid,
	"title" varchar(128) NOT NULL,
	"link" varchar(2048) NOT NULL,
	"description" varchar(2048),
	"publish_date" timestamp (3) with time zone
);
--> statement-breakpoint
CREATE TABLE "blog_status_checks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"blog_id" uuid,
	"blog_status" "blog_status" NOT NULL,
	"message" varchar(256) NOT NULL,
	"duration" integer NOT NULL,
	"check_time" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_submissions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blog_submissions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"blog_id" uuid,
	"name" varchar(64),
	"url" varchar(128),
	"sign" varchar(256),
	"feed" jsonb,
	"sitemap" varchar(256),
	"link_page" varchar(256),
	"architecture" integer,
	"custom_architecture" varchar(64),
	"is_recommended" boolean,
	"blog_status" "blog_status",
	"submit_time" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"review_time" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"ip" "inet" NOT NULL,
	"user_agent" varchar(512) NOT NULL,
	"email" varchar(128),
	"submission_status" "submission_status" NOT NULL,
	"submission_type" "submission_type" NOT NULL,
	"submitter_type" "submitter_type" NOT NULL,
	"reason" varchar(512),
	"request" varchar(512),
	"submitter_id" uuid,
	"reviewer_id" uuid
);
--> statement-breakpoint
CREATE TABLE "blog_to_tags" (
	"blog_id" uuid,
	"tag_id" integer,
	CONSTRAINT "blog_tags_pkey" PRIMARY KEY("blog_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"bid" varchar(16),
	"name" varchar(64) NOT NULL,
	"url" varchar(128) NOT NULL,
	"sign" varchar(256),
	"feed" jsonb,
	"sitemap" varchar(256),
	"link_page" varchar(256),
	"architecture" integer,
	"join_time" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"update_time" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"from" "from_sources"[] NOT NULL,
	"blog_status" "blog_status" DEFAULT 'OK',
	"blog_status_tags" "blog_status_tags"[] DEFAULT '{}',
	"recommendation" boolean DEFAULT false NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"owner_id" uuid,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"weight" numeric(6, 3) DEFAULT '0.000' NOT NULL,
	CONSTRAINT "blogs_bid_unique" UNIQUE("bid")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(32) NOT NULL,
	"type" "tag_type" NOT NULL,
	"description" varchar(512) NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"created_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_social_accounts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_social_accounts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid NOT NULL,
	"provider" "user_social_account_provider" NOT NULL,
	"provider_account_id" varchar(128) NOT NULL,
	"provider_account_username" varchar(64),
	"access_token" text NOT NULL,
	"refresh_token" text,
	"expires_time" integer,
	CONSTRAINT "user_social_accounts_provider_account_id_unique" UNIQUE("provider_account_id"),
	CONSTRAINT "user_social_accounts_access_token_unique" UNIQUE("access_token"),
	CONSTRAINT "user_social_accounts_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(64) NOT NULL,
	"nickname" varchar(64) NOT NULL,
	"email" varchar(128) NOT NULL,
	"password" varchar(256) NOT NULL,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"login_count" integer DEFAULT 0 NOT NULL,
	"last_login_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"create_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"update_time" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "blog_feeds" ADD CONSTRAINT "blog_feeds_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_status_checks" ADD CONSTRAINT "blog_status_checks_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_submissions" ADD CONSTRAINT "blog_submissions_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_submissions" ADD CONSTRAINT "blog_submissions_architecture_architectures_id_fk" FOREIGN KEY ("architecture") REFERENCES "public"."architectures"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_submissions" ADD CONSTRAINT "blog_submissions_submitter_id_users_id_fk" FOREIGN KEY ("submitter_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_submissions" ADD CONSTRAINT "blog_submissions_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_to_tags" ADD CONSTRAINT "blog_to_tags_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blog_to_tags" ADD CONSTRAINT "blog_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_architecture_architectures_id_fk" FOREIGN KEY ("architecture") REFERENCES "public"."architectures"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_social_accounts" ADD CONSTRAINT "user_social_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "architectures_id_index" ON "architectures" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "architectures_name_index" ON "architectures" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "architectures_url_index" ON "architectures" USING btree ("url");--> statement-breakpoint
CREATE INDEX "architectures_count_index" ON "architectures" USING btree ("count" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "architectures_type_index" ON "architectures" USING btree ("architecture_type");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_feeds_id_index" ON "blog_feeds" USING btree ("id");--> statement-breakpoint
CREATE INDEX "blog_feeds_title_index" ON "blog_feeds" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_feeds_blog_id_link_index" ON "blog_feeds" USING btree ("blog_id","link");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_feeds_title_link_index" ON "blog_feeds" USING btree ("title","link");--> statement-breakpoint
CREATE INDEX "blog_feeds_blog_id_title_index" ON "blog_feeds" USING btree ("blog_id","title");--> statement-breakpoint
CREATE INDEX "blog_feeds_publish_date_index" ON "blog_feeds" USING btree ("publish_date" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_feeds_blog_id_publish_date_index" ON "blog_feeds" USING btree ("blog_id","publish_date" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "blog_status_checks_id_index" ON "blog_status_checks" USING btree ("id");--> statement-breakpoint
CREATE INDEX "blog_status_checks_blog_id_index" ON "blog_status_checks" USING btree ("blog_id");--> statement-breakpoint
CREATE INDEX "blog_status_checks_blog_id_check_time_index" ON "blog_status_checks" USING btree ("blog_id","check_time" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_status_checks_status_time_index" ON "blog_status_checks" USING btree ("blog_status","check_time" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_status_checks_status_duration_time_index" ON "blog_status_checks" USING btree ("blog_status","duration" DESC NULLS LAST,"check_time" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_status_checks_blog_status_duration_index" ON "blog_status_checks" USING btree ("blog_id","blog_status","duration" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "blog_submissions_id_index" ON "blog_submissions" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_submissions_name_index" ON "blog_submissions" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_submissions_url_index" ON "blog_submissions" USING btree ("url");--> statement-breakpoint
CREATE INDEX "blog_submissions_architecture_index" ON "blog_submissions" USING btree ("architecture");--> statement-breakpoint
CREATE INDEX "blog_submissions_blog_status_index" ON "blog_submissions" USING btree ("blog_status");--> statement-breakpoint
CREATE INDEX "blog_submissions_recommend_index" ON "blog_submissions" USING btree ("is_recommended");--> statement-breakpoint
CREATE INDEX "blog_submissions_email_index" ON "blog_submissions" USING btree ("email");--> statement-breakpoint
CREATE INDEX "blog_submissions_ip_index" ON "blog_submissions" USING btree ("ip");--> statement-breakpoint
CREATE INDEX "blog_submissions_submit_time_index" ON "blog_submissions" USING btree ("submit_time" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_submissions_review_time_index" ON "blog_submissions" USING btree ("review_time" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "blog_submissions_name_url_index" ON "blog_submissions" USING btree ("name","url");--> statement-breakpoint
CREATE INDEX "blog_submissions_status_time_index" ON "blog_submissions" USING btree ("submission_status","submit_time" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_submissions_submitter_index" ON "blog_submissions" USING btree ("submitter_id");--> statement-breakpoint
CREATE INDEX "blog_submissions_reviewer_index" ON "blog_submissions" USING btree ("reviewer_id");--> statement-breakpoint
CREATE INDEX "blog_submissions_type_index" ON "blog_submissions" USING btree ("submission_type");--> statement-breakpoint
CREATE INDEX "blog_submissions_submitter_type_index" ON "blog_submissions" USING btree ("submitter_type");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_tags_unique_index" ON "blog_to_tags" USING btree ("blog_id","tag_id");--> statement-breakpoint
CREATE INDEX "blog_tags_blog_index" ON "blog_to_tags" USING btree ("blog_id");--> statement-breakpoint
CREATE INDEX "blog_tags_tag_index" ON "blog_to_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_id_index" ON "blogs" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_bid_index" ON "blogs" USING btree ("bid");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_name_index" ON "blogs" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_url_index" ON "blogs" USING btree ("url");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_owner_id_index" ON "blogs" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "blogs_architecture_index" ON "blogs" USING btree ("architecture");--> statement-breakpoint
CREATE INDEX "blogs_weight_index" ON "blogs" USING btree ("weight");--> statement-breakpoint
CREATE INDEX "blogs_from_index" ON "blogs" USING btree ("from");--> statement-breakpoint
CREATE INDEX "blogs_blog_status_index" ON "blogs" USING btree ("blog_status");--> statement-breakpoint
CREATE INDEX "blogs_recommend_index" ON "blogs" USING btree ("recommendation");--> statement-breakpoint
CREATE INDEX "blogs_access_count_index" ON "blogs" USING btree ("access_count");--> statement-breakpoint
CREATE INDEX "blogs_join_time_index" ON "blogs" USING btree ("join_time" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blogs_is_deleted_index" ON "blogs" USING btree ("is_deleted");--> statement-breakpoint
CREATE INDEX "blogs_update_time_index" ON "blogs" USING btree ("update_time" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_name_url_index" ON "blogs" USING btree ("name","url");--> statement-breakpoint
CREATE INDEX "blogs_recommendation_status_index" ON "blogs" USING btree ("recommendation","blog_status");--> statement-breakpoint
CREATE INDEX "blogs_status_recommendation_weight_index" ON "blogs" USING btree ("blog_status","recommendation","weight" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blogs_status_recommendation_weight_access_index" ON "blogs" USING btree ("blog_status","recommendation","weight" DESC NULLS LAST,"access_count" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "tags_id_index" ON "tags" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_name_index" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE INDEX "tags_count_index" ON "tags" USING btree ("count" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "tags_type_index" ON "tags" USING btree ("type");--> statement-breakpoint
CREATE INDEX "tags_type_name_index" ON "tags" USING btree ("type","name");--> statement-breakpoint
CREATE UNIQUE INDEX "user_social_accounts_user_id_provider_account_id_index" ON "user_social_accounts" USING btree ("user_id","provider","provider_account_id");--> statement-breakpoint
CREATE INDEX "user_social_accounts_user_id_index" ON "user_social_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_social_accounts_provider_index" ON "user_social_accounts" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "user_social_accounts_expires_time_index" ON "user_social_accounts" USING btree ("expires_time");--> statement-breakpoint
CREATE UNIQUE INDEX "users_id_index" ON "users" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_index" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_index" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_active_verified_index" ON "users" USING btree ("is_active","is_verified");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_password_index" ON "users" USING btree ("email","password");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_password_index" ON "users" USING btree ("username","password");
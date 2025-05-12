CREATE TYPE "public"."from_enum" AS ENUM('CIB', 'BoYouQuan', 'BlogFinder', 'BKZ', 'Travellings', 'WebSubmit', 'AdminAdd', 'LinkPageSearch', 'OldData');--> statement-breakpoint
CREATE TYPE "public"."main_tag_enum" AS ENUM('生活', '技术', '知识', '整合', '采集', '综合', '');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('OK', 'ERROR', 'SSLERROR');--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"bid" integer,
	"name" varchar(32) NOT NULL,
	"url" varchar(64) NOT NULL,
	"sign" text DEFAULT '',
	"main_tag" "main_tag_enum",
	"sub_tag" jsonb DEFAULT '[]'::jsonb,
	"feed" jsonb DEFAULT '[]'::jsonb,
	"from" "from_enum"[],
	"sitemap" varchar(128),
	"link_page" varchar(128),
	"arch" varchar(32),
	"join_time" timestamp (6) with time zone,
	"update_time" timestamp (6) with time zone,
	"status" "status_enum" DEFAULT 'OK',
	"passed" boolean,
	"recommen" boolean DEFAULT false,
	"access_count" integer DEFAULT 0,
	"reason" text,
	CONSTRAINT "blogs_bid_unique" UNIQUE("bid"),
	CONSTRAINT "blogs_name_unique" UNIQUE("name"),
	CONSTRAINT "blogs_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "id_index" ON "blogs" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "bid_index" ON "blogs" USING btree ("bid");--> statement-breakpoint
CREATE UNIQUE INDEX "name_index" ON "blogs" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "url_index" ON "blogs" USING btree ("url");--> statement-breakpoint
CREATE INDEX "main_tag_index" ON "blogs" USING btree ("main_tag");--> statement-breakpoint
CREATE INDEX "sub_tag_index" ON "blogs" USING btree ("sub_tag");
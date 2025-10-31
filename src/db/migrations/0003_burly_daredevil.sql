CREATE TYPE "public"."database_type" AS ENUM('mysql', 'postgres', 'mongodb');--> statement-breakpoint
CREATE TABLE "chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text DEFAULT 'New Chat',
	"data_string" text,
	"database" "database_type",
	"safemode" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"content" text NOT NULL,
	"sql_result" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat" ADD CONSTRAINT "chat_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_chat_user_id" ON "chat" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_chat_created_at" ON "chat" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_message_chat_id" ON "message" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "idx_message_created_at" ON "message" USING btree ("created_at");
ALTER TABLE "tests" ADD COLUMN "webpagetest_id" text;--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "error" text;--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "completed_at" timestamp;
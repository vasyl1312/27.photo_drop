CREATE TABLE IF NOT EXISTS "photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

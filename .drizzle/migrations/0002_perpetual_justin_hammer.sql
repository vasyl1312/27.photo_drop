CREATE TABLE IF NOT EXISTS "albums" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"counter_photo" integer DEFAULT 0 NOT NULL,
	"location" varchar(250) NOT NULL,
	"created_at" varchar(25) NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "albums" ADD CONSTRAINT "albums_owner_photographers_id_fk" FOREIGN KEY ("owner") REFERENCES "photographers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "photoSchema" (
	"id" serial PRIMARY KEY NOT NULL,
	"album_id" integer NOT NULL,
	"name" varchar(50),
	"people" varchar[] DEFAULT '{}'::varchar[],
	"original_resized_url" varchar DEFAULT 'https://photo-drop.onrender.com/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2' NOT NULL,
	"watermark_resized_url" varchar DEFAULT 'https://photo-drop.onrender.com/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2' NOT NULL,
	"original_url" varchar DEFAULT 'https://photo-drop.onrender.com/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2' NOT NULL,
	"watermark_url" varchar DEFAULT 'https://photo-drop.onrender.com/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2' NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "photoSchema" ADD CONSTRAINT "photoSchema_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

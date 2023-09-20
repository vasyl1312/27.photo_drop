CREATE TABLE IF NOT EXISTS "photographers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar NOT NULL,
	"login" varchar(50) NOT NULL
);

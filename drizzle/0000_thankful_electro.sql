CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pronouns" text,
	"description" text,
	"track" text,
	"facebook" text,
	"instagram" text,
	"tiktok" text,
	"color_one" text,
	"color_two" text,
	"color_three" text
);

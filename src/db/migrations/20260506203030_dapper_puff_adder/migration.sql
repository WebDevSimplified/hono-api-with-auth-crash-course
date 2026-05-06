CREATE TABLE "authors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"birthday" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);

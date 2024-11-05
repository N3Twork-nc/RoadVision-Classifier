CREATE TABLE IF NOT EXISTS "account" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"verified" bigint,
	"phone" varchar(255) UNIQUE,
	"username" varchar(255) NOT NULL UNIQUE,
	"active" boolean NOT NULL DEFAULT false,
	"created" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial NOT NULL,
	"birthday" timestamp with time zone,
	"introduction" varchar(255),
	"gender" varchar(255),
	"avatar" varchar(255),
	"fisrtname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	PRIMARY KEY ("user_id")
);

CREATE TABLE IF NOT EXISTS "Role" (
	"user_id" serial NOT NULL,
	"permition_id" serial NOT NULL,
	PRIMARY KEY ("user_id", "permition_id")
);

CREATE TABLE IF NOT EXISTS "Permition" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE,
	"description" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Road" (
	"id" serial NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"lat" double precision NOT NULL,
	"long" double precision NOT NULL,
	"timestamp" time without time zone NOT NULL,
	"image" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AccessRoad" (
	"id_user" serial NOT NULL,
	"id_road" serial NOT NULL,
	"type_access" varchar(255) NOT NULL
);


ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id") REFERENCES "account"("id");
ALTER TABLE "Role" ADD CONSTRAINT "Role_fk0" FOREIGN KEY ("user_id") REFERENCES "account"("id");

ALTER TABLE "Role" ADD CONSTRAINT "Role_fk1" FOREIGN KEY ("permition_id") REFERENCES "Permition"("id");

ALTER TABLE "Road" ADD CONSTRAINT "Road_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");
ALTER TABLE "AccessRoad" ADD CONSTRAINT "AccessRoad_fk0" FOREIGN KEY ("id_user") REFERENCES "user"("user_id");

ALTER TABLE "AccessRoad" ADD CONSTRAINT "AccessRoad_fk1" FOREIGN KEY ("id_road") REFERENCES "Road"("id");

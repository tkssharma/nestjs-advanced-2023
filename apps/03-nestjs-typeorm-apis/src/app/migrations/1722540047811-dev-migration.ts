import { MigrationInterface, QueryRunner } from 'typeorm';

export class DevMigration1722540047811 implements MigrationInterface {
  name = 'DevMigration1722540047811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2f8d527df0d3acb8aa51945a968" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurants_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(255) NOT NULL, "state" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" uuid, CONSTRAINT "REL_453ee4f1d06aa5f61464dfffa4" UNIQUE ("restaurant_id"), CONSTRAINT "PK_94bea0cd6b702bc812d652d9621" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurants_dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying, "category" character varying, "food_type" character varying, "meal_type" character varying, "cuisine_type" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" uuid, CONSTRAINT "PK_c62f6460fa3c635d330ec6d7153" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants_addresses" ADD CONSTRAINT "FK_453ee4f1d06aa5f61464dfffa40" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants_dishes" ADD CONSTRAINT "FK_b7dd7cb87440838d54b45581638" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants_dishes" DROP CONSTRAINT "FK_b7dd7cb87440838d54b45581638"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants_addresses" DROP CONSTRAINT "FK_453ee4f1d06aa5f61464dfffa40"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "restaurants_dishes"`);
    await queryRunner.query(`DROP TABLE "restaurants"`);
    await queryRunner.query(`DROP TABLE "restaurants_addresses"`);
    await queryRunner.query(`DROP TABLE "users_addresses"`);
  }
}

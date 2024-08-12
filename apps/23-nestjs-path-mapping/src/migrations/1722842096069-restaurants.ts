import { MigrationInterface, QueryRunner } from 'typeorm';

export class Restaurants1722842096069 implements MigrationInterface {
  name = 'Restaurants1722842096069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE if not exists "restaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying, "desc" character varying, "type" character varying, "website_url" character varying, "title" character varying, "social_links" jsonb, "cuisine" character varying, "ratings" integer, "average_price" integer, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "contact_no" character varying, "thumbnails" jsonb, "delivery_time" integer, "delivery_options" character varying, "pickup_options" character varying NOT NULL, "opens_at" character varying NOT NULL, "restaurant_address" jsonb, "closes_at" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "restaurants"`);
  }
}

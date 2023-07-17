import { MigrationInterface, QueryRunner } from 'typeorm';

export class ff1689608632954 implements MigrationInterface {
  name = 'ff1689608632954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "restaurant_dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying, "category" character varying, "food_type" character varying, "meal_type" character varying, "cuisine_type" character varying, "ingredients" character varying, "thumbnails" character varying, "price" integer NOT NULL, "delivery_time" integer, "rating" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" uuid, CONSTRAINT "PK_d9e282f04715bdc13e5bd6ffa2c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying, "owner_id" character varying NOT NULL, "website_url" character varying, "social_links" jsonb, "cuisine" character varying, "ratings" integer, "average_price" integer, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "contact_no" character varying, "thumbnails" jsonb, "delivery_time" integer, "delivery_options" character varying, "pickup_options" character varying NOT NULL, "opens_at" character varying NOT NULL, "closes_at" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "pincode" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" uuid, CONSTRAINT "REL_1acf4f27c6b48851a36a0fe851" UNIQUE ("restaurant_id"), CONSTRAINT "PK_109960073e718523582b9440353" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_dishes" ADD CONSTRAINT "FK_be04b881031d4bae354c5a76f4c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ADD CONSTRAINT "FK_1acf4f27c6b48851a36a0fe851e" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" DROP CONSTRAINT "FK_1acf4f27c6b48851a36a0fe851e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_dishes" DROP CONSTRAINT "FK_be04b881031d4bae354c5a76f4c"`,
    );
    await queryRunner.query(`DROP TABLE "restaurant_address"`);
    await queryRunner.query(`DROP TABLE "restaurants"`);
    await queryRunner.query(`DROP TABLE "restaurant_dishes"`);
  }
}

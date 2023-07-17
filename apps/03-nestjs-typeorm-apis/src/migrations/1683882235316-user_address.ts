import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAddress1683882235316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."users_addresses" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "city" varchar(255) NOT NULL,
          "state" varchar(255) NOT NULL,
          "created_at" timestamptz NOT NULL DEFAULT now(),
          "updated_at" timestamptz NOT NULL DEFAULT now(),
          PRIMARY KEY ("id")
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."users_addresses"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class foodOrderV31689614664821 implements MigrationInterface {
  name = 'foodOrderV31689614664821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ADD "desc" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" DROP COLUMN "desc"`,
    );
  }
}

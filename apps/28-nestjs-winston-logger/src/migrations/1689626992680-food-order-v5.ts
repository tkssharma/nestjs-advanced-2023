import { MigrationInterface, QueryRunner } from 'typeorm';

export class foodOrderV51689626992680 implements MigrationInterface {
  name = 'foodOrderV51689626992680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants" ADD "restaurant_address" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants" DROP COLUMN "restaurant_address"`,
    );
  }
}

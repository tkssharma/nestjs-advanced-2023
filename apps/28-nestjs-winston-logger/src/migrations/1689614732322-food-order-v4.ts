import { MigrationInterface, QueryRunner } from 'typeorm';

export class foodOrderV41689614732322 implements MigrationInterface {
  name = 'foodOrderV41689614732322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ALTER COLUMN "desc" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ALTER COLUMN "address" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ALTER COLUMN "address" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ALTER COLUMN "desc" SET NOT NULL`,
    );
  }
}

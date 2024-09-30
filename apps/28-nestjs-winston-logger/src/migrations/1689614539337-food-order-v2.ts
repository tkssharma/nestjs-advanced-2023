import { MigrationInterface, QueryRunner } from 'typeorm';

export class foodOrderV21689614539337 implements MigrationInterface {
  name = 'foodOrderV21689614539337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ADD "address" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" DROP COLUMN "address"`,
    );
  }
}

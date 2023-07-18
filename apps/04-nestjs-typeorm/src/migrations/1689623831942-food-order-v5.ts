import { MigrationInterface, QueryRunner } from 'typeorm';

export class foodOrderV51689623831942 implements MigrationInterface {
  name = 'foodOrderV51689623831942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants" ADD "type" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "restaurants" DROP COLUMN "type"`);
  }
}

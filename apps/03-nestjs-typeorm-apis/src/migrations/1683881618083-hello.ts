import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1683881618083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users add COLUMN address jsonb null`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users drop COLUMN address`);
  }
}

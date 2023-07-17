import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAlter1683881883211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users add COLUMN data jsonb null`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users drop COLUMN data`);
  }
}

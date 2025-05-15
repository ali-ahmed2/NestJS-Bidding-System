import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBidTableTimeStamp1747334195171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE bid
        MODIFY COLUMN time BIGINT UNSIGNED NOT NULL;
    `);
  }

  public async down(): Promise<void> {}
}

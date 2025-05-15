import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItemTable1747308893551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`item\` (
              \`id\` CHAR(36) NOT NULL PRIMARY KEY,
              \`name\` VARCHAR(255) NOT NULL,
              \`description\` VARCHAR(255) NOT NULL,
              \`startingAmount\` FLOAT NOT NULL,
              \`auctionDurationInMinutes\` INT NOT NULL,
              \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              \`deletedAt\` TIMESTAMP NULL DEFAULT NULL,
              \`createdBy\` CHAR(36) NULL,
              \`updatedBy\` CHAR(36) NULL,
              \`deletedBy\` CHAR(36) NULL
            );
          `);
  }

  public async down(): Promise<void> {}
}

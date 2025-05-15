import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export class CreateAndSeedUsers1747313684562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user (
            id CHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL DEFAULT NULL,
            createdBy CHAR(36) NULL,
            updatedBy CHAR(36) NULL,
            deletedBy CHAR(36) NULL
        );
    `);

    const users = Array.from({ length: 100 }, (_, i) => {
      const id = uuidV4();
      const name = `User ${i + 1}`;
      return `('${id}', '${name}')`;
    });

    const chunkSize = 100;
    for (let i = 0; i < users.length; i += chunkSize) {
      const chunk = users.slice(i, i + chunkSize).join(', ');
      await queryRunner.query(`
        INSERT INTO user (id, name)
        VALUES ${chunk};
    `);
    }
  }

  public async down(): Promise<void> {}
}

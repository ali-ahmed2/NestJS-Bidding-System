import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBidTable1747314739140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE bid (
            id CHAR(36) NOT NULL PRIMARY KEY,
            userID CHAR(36) NOT NULL,
            itemID CHAR(36) NOT NULL,
            time TIMESTAMP NOT NULL,
            amount DOUBLE NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL DEFAULT NULL,
            createdBy CHAR(36) NULL,
            updatedBy CHAR(36) NULL,
            deletedBy CHAR(36) NULL,
            CONSTRAINT BID_TO_USER_FOREIGN_KEY_CONSTRAINT FOREIGN KEY (userID) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT BID_TO_ITEM_FOREIGN_KEY_CONSTRAINT FOREIGN KEY (itemID) REFERENCES item(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    `);
  }

  public async down(): Promise<void> {}
}

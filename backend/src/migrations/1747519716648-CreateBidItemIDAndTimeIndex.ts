import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBidItemIDAndTimeIndex1747519716649
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE INDEX idx_bid_itemid_time 
        ON bid(itemID, time)
        USING BTREE
    `);
  }

  public async down(): Promise<void> {}
}

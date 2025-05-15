import { Bid } from 'src/bid/entities/bid.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('float', { nullable: false })
  startingAmount: number;

  @Column('int', { nullable: false })
  auctionDurationInMinutes: number;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids?: Bid[];
}

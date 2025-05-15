import { Bid } from 'src/bid/entities/bid.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @OneToMany(() => Bid, (bid) => bid.user)
  bids?: Bid[];
}

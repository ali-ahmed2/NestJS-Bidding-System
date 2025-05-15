import { CONSTRAINTS } from 'src/common/constants';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bid extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  userID: string;

  @Column('uuid', { nullable: false })
  itemID: string;

  @Column('bigint', { nullable: false })
  time: number;

  @Column()
  amount: number;

  @ManyToOne(() => User)
  @JoinColumn({
    foreignKeyConstraintName: CONSTRAINTS.BID_TO_USER_FOREIGN_KEY_CONSTRAINT,
    name: 'userID',
    referencedColumnName: 'id',
  })
  user?: User;

  @ManyToOne(() => Item)
  @JoinColumn({
    foreignKeyConstraintName: CONSTRAINTS.BID_TO_ITEM_FOREIGN_KEY_CONSTRAINT,
    name: 'itemID',
    referencedColumnName: 'id',
  })
  item?: Item;
}

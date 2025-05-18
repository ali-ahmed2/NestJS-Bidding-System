import { MessageEvent } from '@nestjs/common';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { DataSource, Repository } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Observable } from 'rxjs';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid) private readonly bidRepository: Repository<Bid>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  ValidateIfBidCanBePlaced(
    item: Item | null,
    latestBid: Bid | null,
    currentBidDto: CreateBidDto,
  ) {
    if (!item)
      throw new NotFoundException(
        `Bid cannot be placed since the specified item does not exist!`,
      );

    const auctionEndsAt =
      new Date(item.createdAt).getTime() +
      item.auctionDurationInMinutes * 60 * 1000;
    const wasBidPlacedWithinAuctionTime = currentBidDto.time < auctionEndsAt;

    if (!wasBidPlacedWithinAuctionTime)
      throw new ForbiddenException(`Auction has ended! No bids are allowed.`);

    const bidThresholdAmount = latestBid?.amount ?? item.startingAmount;
    const isBidAmountGreaterThanThreshold =
      currentBidDto.amount > bidThresholdAmount;

    if (!isBidAmountGreaterThanThreshold)
      throw new ForbiddenException(
        'Bid amount must be greater than both starting and largest bid amount!',
      );
  }

  async create(createBidDto: CreateBidDto) {
    await this.dataSource.transaction('READ COMMITTED', async (manager) => {
      const { itemID, userID, amount, time } = createBidDto;

      const [item, latestBid] = await Promise.all([
        manager.findOne(Item, {
          where: { id: itemID },
          lock: { mode: 'pessimistic_write' },
        }),
        manager.findOne(Bid, {
          select: { amount: true },
          where: { itemID },
          order: { time: 'DESC' },
        }),
      ]);

      this.ValidateIfBidCanBePlaced(item, latestBid, createBidDto);

      const newBid = manager.create(Bid, { userID, itemID, amount, time });
      return await manager.save(Bid, newBid);
    });
  }

  async GetLatestBid(itemID: string) {
    const latestBid = await this.bidRepository.findOne({
      where: { itemID },
      order: { time: 'DESC' },
    });
    if (!latestBid) throw new NotFoundException('No latest bid found!');

    return latestBid;
  }

  StreamLatestBid(itemID: string): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      let isActive = true;

      const poll = async () => {
        if (!isActive) return;

        try {
          const latestBid = await this.GetLatestBid(itemID);

          if (latestBid) {
            subscriber.next({ data: { amount: latestBid.amount } });
          }
        } catch (err) {
          console.error('Stream error:', err);
          subscriber.error(err);
          return;
        }

        if (isActive) {
          setTimeout(() => {
            void poll();
          }, 1000);
        }
      };

      void poll();

      return () => {
        isActive = false;
      };
    });
  }
}

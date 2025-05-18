import { Controller, Post, Body, Sse, Param } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  async create(@Body() createBidDto: CreateBidDto) {
    await this.bidService.create(createBidDto);
    return { message: 'Your bid has been placed successfully!' };
  }

  @Sse(':itemID/latest-bid')
  steamLatestBid(@Param('itemID') itemID: string) {
    return this.bidService.StreamLatestBid(itemID);
  }
}

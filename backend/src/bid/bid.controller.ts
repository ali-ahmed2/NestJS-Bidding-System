import { Controller, Get, Post, Body } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  async create(@Body() createBidDto: CreateBidDto) {
    await this.bidService.create(createBidDto);
    return 'Your bid has been placed successfully!';
  }

  @Get()
  async findAll() {
    return await this.bidService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bidService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
  //   return this.bidService.update(+id, updateBidDto);
  // }
}

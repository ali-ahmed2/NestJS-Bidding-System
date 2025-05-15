import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    return await this.itemRepository.insert({ ...createItemDto });
  }

  async findAll() {
    return await this.itemRepository.findAndCount();
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item (${id}) not found!`);

    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return await this.itemRepository.update({ id }, { ...updateItemDto });
  }
}

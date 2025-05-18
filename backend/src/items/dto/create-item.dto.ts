import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty({ message: 'Name is missing!' })
  name: string;

  @IsNotEmpty({ message: 'Description is missing!' })
  description: string;

  @IsNotEmpty({ message: 'Starting bid amount is missing!' })
  @IsNumber(
    { allowNaN: false },
    { message: 'Starting bid amount must be a valid number!' },
  )
  @IsPositive({ message: 'Starting bid amount must be a positive number!' })
  startingAmount: number;

  @IsNotEmpty({ message: 'Auction duration in minutes is missing!' })
  @IsNumber(
    { allowNaN: false },
    { message: 'Auction duration must be a valid number!' },
  )
  @IsPositive({ message: 'Auction duration must be a positive number!' })
  auctionDurationInMinutes: number;
}

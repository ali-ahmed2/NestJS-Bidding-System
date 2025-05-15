/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty({ message: `A bid cannot be placed without user's information!` })
  userID: string;

  @IsNotEmpty({ message: `A bid cannot be placed without item's information` })
  itemID: string;

  @IsNotEmpty({ message: `Bid's timestamp is missing!` })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: `Bid's timestamp must be a number!` },
  )
  @IsPositive({ message: `Bid's timestamp must be a positive number!` })
  time: number;

  @IsNotEmpty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Bid amount must be a valid number!' },
  )
  @IsPositive({ message: 'Bid amount must be positive!' })
  amount: number;
}

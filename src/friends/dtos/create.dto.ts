import { Transform } from 'class-transformer';
import { IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateFriendsdto {
  @IsNumber()
  @IsNotEmpty()
  user_id_1: bigint;

  @IsNumber()
  @IsNotEmpty()
  user_id_2: bigint;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;

}

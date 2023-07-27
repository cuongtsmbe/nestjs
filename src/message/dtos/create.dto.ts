import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  coversation_id: bigint;

  @IsNumber()
  @IsNotEmpty()
  user_id: bigint;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;
}

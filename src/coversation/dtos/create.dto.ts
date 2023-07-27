import {
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateCoversationDto {
  @IsNumber()
  @IsNotEmpty()
  coversation_id: bigint;

  @IsString()
  name: string;

  @IsString()
  avatar: string;

  @IsNumber()
  type: number;

  @IsArray()
  @IsNumber({}, { each: true })
  members: number[];

  @IsNumber()
  status: number;

  @IsDate()
  background: Date;

  @IsDate()
  last_activity: Date;

  @IsDate()
  timestamp: Date;
}

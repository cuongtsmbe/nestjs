import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateCoversationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  avatar: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  members: number[];

  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  background: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  last_activity: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;
}

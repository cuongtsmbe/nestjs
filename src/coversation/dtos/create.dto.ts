import { IsString, IsNumber, IsArray, IsDate } from 'class-validator';

export class CreateCoversationDto {
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

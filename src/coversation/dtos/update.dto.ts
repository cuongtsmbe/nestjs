import { IsString, IsArray, IsNumber, IsDate } from 'class-validator';

export class UpdateCoversationDto {
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

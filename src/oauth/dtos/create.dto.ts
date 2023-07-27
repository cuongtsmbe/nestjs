import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateOauthDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: bigint;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;
}

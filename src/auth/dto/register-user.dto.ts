import {
  IsString,
  IsEmail,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class RegisterUserDto {
  @IsNumber()
  user_id: bigint;

  @IsString()
  avatar: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  street: string;

  @IsString()
  lat: string;

  @IsString()
  lng: string;

  @IsNumber()
  country_id: number;

  @IsNumber()
  city_id: number;

  @IsNumber()
  district_id: number;

  @IsNumber()
  ward_id: number;

  @IsString()
  phone: string;

  @IsString()
  gender: string;

  @IsString()
  birthday: string;

  @IsDateString()
  timestamp: Date;
}

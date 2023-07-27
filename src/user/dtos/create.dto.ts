import {
  IsString,
  IsEmail,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  avatar?: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  street?: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;

  @IsNumber()
  country_id?: number;

  @IsNumber()
  city_id?: number;

  @IsNumber()
  district_id?: number;

  @IsNumber()
  ward_id?: number;

  @IsString()
  phone?: string;

  @IsString()
  gender?: string;

  @IsString()
  birthday?: string;

  @IsDateString()
  timestamp?: Date;
}

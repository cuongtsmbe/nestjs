import {
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  avatar: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
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

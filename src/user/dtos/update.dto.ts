import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  avatar?: string;

  @IsString()
  name?: string;

  @IsString()
  password?: string;

  @IsString()
  street?: string;

  @IsString()
  @IsNotEmpty()
  lat?: string;

  @IsString()
  @IsNotEmpty()
  lng?: string;

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
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;

  // Hàm loại bỏ thuộc tính có giá trị undefined
  private filterObject(obj: any): any {
    const result: any = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  // Hàm constructor để xử lý việc gán giá trị từ object vào DTO
  constructor(partial: Partial<UpdateUserDto>) {
    const filteredPartial = this.filterObject(partial);
    Object.assign(this, filteredPartial);
  }
}

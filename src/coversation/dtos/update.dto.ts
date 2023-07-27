import { Transform } from 'class-transformer';
import { IsString, IsArray, IsNumber, IsDate } from 'class-validator';

export class UpdateCoversationDto {
  @IsString()
  name?: string;

  @IsString()
  avatar?: string;

  @IsNumber()
  type?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  members?: number[];

  @IsNumber()
  status?: number;

  @IsDate()
  background?: Date;

  @IsDate()
  last_activity?: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;

  // Hàm constructor để xử lý việc gán giá trị từ object vào DTO
  constructor(partial: Partial<UpdateCoversationDto>) {
    Object.assign(this, partial);
    this.removeUndefinedProperties();
  }

  private removeUndefinedProperties() {
    for (const key in this) {
      if (this.hasOwnProperty(key) && this[key] === undefined) {
        delete this[key];
      }
    }
  }
}

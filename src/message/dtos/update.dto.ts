import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  coversation_id: bigint;

  @IsNumber()
  @IsNotEmpty()
  user_id: bigint;

  @IsNumber()
  type?: number;

  @IsString()
  message?: string;

  @IsNumber()
  status?: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;

  // Hàm constructor để xử lý việc gán giá trị từ object vào DTO
  constructor(partial: Partial<UpdateMessageDto>) {
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

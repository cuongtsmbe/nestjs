import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateOauthDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsNumber()
  @IsNotEmpty()
  status?: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;

  constructor(partial: Partial<UpdateOauthDto>) {
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

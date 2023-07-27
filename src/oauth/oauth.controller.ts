import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OauthService } from './oauth.service';
import { CreateOauthDto } from './dtos/create.dto';
import { OauthInterface } from './oauth.interface';
import { UpdateOauthDto } from './dtos/update.dto';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post()
  async create(@Body() dtoOauth: CreateOauthDto) {
    const res = await this.oauthService.create(dtoOauth);
    if (!res) {
      return false;
    }
    return true;
  }

  @Get(':user_id')
  async findTokenByUserID(
    @Param('user_id', ParseIntPipe) user_id: bigint,
    @Query('access_token') access_token: string,
  ) {
    if (isNaN(Number(user_id))) {
      return 'Invalid id';
    }
    const oauthData: OauthInterface = await this.oauthService.findTokenByUserID(
      user_id,
      access_token,
    );
    return oauthData;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateOauthDto) {
    const oauthData: any = await this.oauthService.update(id, body);
    return oauthData;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const resultDel = await this.oauthService.delete(id);
    return resultDel;
  }
}

import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('redis-ping')
  redisPing() {
    return this.appService.redisPing();
  }

  @Post('redis-set')
  redisSet() {
    return this.appService.setRedis("abc","16-abc");
  }

  @Get('redis-get')
  redisGet() {
    return this.appService.getRedis("abc");
  }
}

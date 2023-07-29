import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    await this.redisService.set('Hi', 'Nestjs Hi');
    return String(this.redisService.get('Hi'));
    //return this.appService.getHello();
  }
}

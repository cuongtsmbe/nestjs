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
    try {
      await this.redisService.set('Hi', 'Nestjs Hi');
    } catch (e) {
      console.log(e);
    }
    return String(await this.redisService.get('Hi'));
    // return this.appService.getHello();
  }
}

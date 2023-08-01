import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  redisPing() {
    return this.redisService.ping();
  }

  setRedis(key:string,value:string) {
    return this.redisService.set(key,value);
  }

  getRedis(key:string) {
    return this.redisService.get(key);
  }
}

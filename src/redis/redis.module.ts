import { RedisService } from './redis.service';
import { Module } from '@nestjs/common';
import { redisClientFactory } from './redis-client.factory';
import { REDIS_CLIENT } from './redis-client.type';

@Module({
  providers: [RedisService,redisClientFactory],
  exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}

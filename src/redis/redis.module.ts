import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        isGlobal: true,
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: 6379,
        password: configService.get<string>('REDIS_PASSWORD'), // get password from ConfigService
        tls: process.env.REDIS_TLS,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService, CacheModule],
})
export class RedisModule {}

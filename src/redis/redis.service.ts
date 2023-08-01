
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
} from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly redis: RedisClient,
  ) {}

  onModuleDestroy() {
    this.redis.quit();
  }

  ping() {
    return this.redis.ping();
  }

  async set(key:string,value:string){
    try{
      return await this.redis.set(key,value);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async get(key:string){
    try {
        return await this.redis.get(key);
    } catch (error) {
            throw new InternalServerErrorException();
    }
  }
}
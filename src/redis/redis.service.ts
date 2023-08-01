
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
} from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
import { UserInterface } from 'src/user/user.interface';

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

  async get(key:string):Promise<UserInterface>{
    try {
        return JSON.parse(await this.redis.get(key));
    } catch (error) {
            throw new InternalServerErrorException();
    }
  }

  // Hàm lưu trữ một user_id và socket trong Redis
  async setConnectedUser(user_id: string, socket_id: string): Promise<void> {
    await this.redis.set("user_id:"+user_id, socket_id);
  }

  // Hàm lấy thông tin socket dựa vào user_id từ Redis
  async getConnectedUser(key: string): Promise<string | null> {
    const socket_id = await this.redis.get(key);
    return socket_id? socket_id : null;
  }

  // Hàm xóa thông tin socket của một user_id từ Redis
  async removeConnectedUser(user_id: string): Promise<void> {
    await this.redis.del("user_id:"+user_id);
  }

  async getKeysWithPrefix(prefix: string): Promise<string[]> {
    const allKeys = await this.redis.keys('*'); // Lấy tất cả các key trong Redis
    const matchedKeys: string[] = allKeys.filter((key) => key.startsWith(prefix));
    return matchedKeys;
  }

}
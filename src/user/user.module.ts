import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { Oauth } from 'src/oauth/oauth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/ auth.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Oauth]), AuthModule,RedisModule],
  controllers: [UserController],
  providers: [UserService, JwtService, ConfigService],
  exports:[UserService]
})
export class UserModule {}

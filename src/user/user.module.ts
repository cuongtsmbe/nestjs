import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { Oauth } from 'src/oauth/oauth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User, Oauth])],
  controllers: [UserController],
  providers: [UserService, JwtService, ConfigService],
})
export class UserModule {}

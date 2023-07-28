import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { Oauth } from 'src/oauth/oauth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Oauth])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

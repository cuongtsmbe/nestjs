import { TypeOrmModule } from '@nestjs/typeorm';
import { Oauth } from './oauth.entity';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Oauth])],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}

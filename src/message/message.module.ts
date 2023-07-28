import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CoversationModule } from 'src/coversation/coversation.module';
import { Oauth } from 'src/oauth/oauth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), CoversationModule, Oauth],
  controllers: [MessageController],
  providers: [MessageService, JwtService, ConfigService],
})
export class MessageModule {}

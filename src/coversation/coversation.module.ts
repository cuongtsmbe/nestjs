import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coversation } from './coversation.entity';
import { CoversationsService } from './coversation.service';
import { CoversationController } from './coversation.controller';
import { Message } from 'src/message/message.entity';
import { Oauth } from 'src/oauth/oauth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coversation, Message, Oauth])],
  controllers: [CoversationController],
  providers: [CoversationsService, JwtService, ConfigService, MessageService],
  exports: [CoversationsService],
})
export class CoversationModule {}

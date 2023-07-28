import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coversation } from './coversation.entity';
import { CoversationsService } from './coversation.service';
import { CoversationController } from './coversation.controller';
import { Message } from 'src/message/message.entity';
import { Oauth } from 'src/oauth/oauth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coversation, Message, Oauth])],
  controllers: [CoversationController],
  providers: [CoversationsService],
  exports: [CoversationsService],
})
export class CoversationModule {}

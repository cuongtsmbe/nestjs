import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CoversationModule } from 'src/coversation/coversation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), CoversationModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

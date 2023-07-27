import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coversation } from './coversation.entity';
import { CoversationsService } from './coversation.service';
import { CoversationController } from './coversation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coversation])],
  controllers: [CoversationController],
  providers: [CoversationsService],
})
export class CoversationModule {}

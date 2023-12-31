import { Injectable } from '@nestjs/common';
import { Coversation } from './coversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoversationDto } from './dtos/create.dto';
import { CoversationInterface } from './coversation.interface';
import { Message } from 'src/message/message.entity';
import { MessageInterface } from 'src/message/message.interface';

@Injectable()
export class CoversationsService {
  constructor(
    @InjectRepository(Coversation)
    private conversationRepository: Repository<Coversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findOneCoversation(
    conversation_id: bigint,
    user_id: bigint,
  ): Promise<CoversationInterface> {
    //check coversation id is of user_id login
    const message: MessageInterface = await this.messageRepository
      .createQueryBuilder()
      .where('coversation_id = :conversation_id AND user_id = :user_id', {
        conversation_id,
        user_id,
      })
      .getOne();

    if (!message) {
      return null;
    }
    //get coversation infomation
    return this.conversationRepository
      .createQueryBuilder()
      .where('coversation_id = :conversation_id', {
        conversation_id,
      })
      .getOne();
  }

  async findConversationByMembers(members: number[]): Promise<CoversationInterface | null> {
    // Find a conversation with the given members
    const conversation: CoversationInterface = await this.conversationRepository
      .createQueryBuilder()
      .where('members = :members', { members: members })
      .getOne();

    return conversation || null;
  }

  async checkCoversationID(conversation_id: bigint): Promise<boolean> {
    const coversation: any = await this.conversationRepository
      .createQueryBuilder()
      .where('coversation_id = :conversation_id', {
        conversation_id,
      })
      .getOne();

    if (!coversation) {
      return false;
    }
    return true;
  }

  GetListCoversationByUserID(
    user_id: bigint,
    limit: number,
  ): Promise<CoversationInterface[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .select('coversation.*')
      .leftJoin(
        Coversation,
        'coversation',
        'message.coversation_id = coversation.coversation_id',
      )
      .where('message.user_id = :user_id', {
        user_id,
      })
      .addGroupBy('coversation.coversation_id')
      .take(limit)
      .getRawMany();
  }

  create(conversation: CreateCoversationDto): Promise<any> {
    return this.conversationRepository.save(
      this.conversationRepository.create(conversation),
    );
  }

  update(coversation_id: bigint, data: any): Promise<any> {
    return this.conversationRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('coversation_id = :coversation_id', { coversation_id })
      .execute();
  }

  //change status coversation_id is 0
  delete(coversation_id: bigint): Promise<any> {
    return this.conversationRepository
      .createQueryBuilder()
      .update()
      .set({ status: 0 })
      .where('coversation_id = :coversation_id', { coversation_id })
      .execute();
  }
}

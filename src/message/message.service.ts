import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/create.dto';
import { MessageInterface } from './message.interface';
import { UpdateMessageDto } from './dtos/update.dto';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(message: CreateMessageDto): Promise<any> {
    return this.messageRepository.save(this.messageRepository.create(message));
  }

  getOne(message_id: bigint, user_id: bigint): Promise<MessageInterface> {
    return this.messageRepository.findOne({ where: { message_id, user_id } });
  }

  //get list messages by coversation_id and user_id
  async GetListByCoversationID(
    coversation_id: bigint,
    user_id: bigint,
    limit: number,
  ): Promise<MessageInterface[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .where('message.coversation_id = :coversation_id', { coversation_id })
      .andWhere('message.user_id = :user_id', { user_id })
      .take(limit)
      .getMany();
  }

  update(message_id: bigint, data: UpdateMessageDto): Promise<any> {
    return this.messageRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('message_id = :message_id', { message_id })
      .execute();
  }

  delete(message_id: bigint): Promise<any> {
    return this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('message_id = :message_id', { message_id })
      .execute();
  }
}

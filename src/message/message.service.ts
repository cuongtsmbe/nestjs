import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/create.dto';
import { MessageInterface } from './message.interface';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(message: CreateMessageDto): Promise<any> {
    return this.messageRepository.save(this.messageRepository.create(message));
  }

  find(id: number): Promise<any[]> {
    return this.messageRepository.find({ where: { id } });
  }

  async findAll(limit: number): Promise<MessageInterface[]> {
    return this.messageRepository.find({
      take: limit,
    });
  }

  update(id: string, data: any): Promise<any> {
    return this.messageRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  delete(id: string): Promise<any> {
    return this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('id = :id', { id })
      .execute();
  }
}

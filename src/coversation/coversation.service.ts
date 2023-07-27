import { Injectable } from '@nestjs/common';
import { Coversation } from './coversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoversationDto } from './dtos/create.dto';
import { CoversationInterface } from './coversation.interface';

@Injectable()
export class CoversationsService {
  constructor(
    @InjectRepository(Coversation)
    private conversationRepository: Repository<Coversation>,
  ) {}

  find(id: number): Promise<any[]> {
    return this.conversationRepository.find({ where: { id } });
  }

  async findAll(limit: number): Promise<CoversationInterface[]> {
    return this.conversationRepository.find({
      take: limit,
    });
  }

  create(conversation: CreateCoversationDto): Promise<any> {
    return this.conversationRepository.save(
      this.conversationRepository.create(conversation),
    );
  }

  update(id: string, data: any): Promise<any> {
    return this.conversationRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  delete(id: string): Promise<any> {
    return this.conversationRepository
      .createQueryBuilder()
      .delete()
      .from(Coversation)
      .where('id = :id', { id })
      .execute();
  }
}

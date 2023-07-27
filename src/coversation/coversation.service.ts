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

  find(coversation_id: bigint): Promise<CoversationInterface> {
    return this.conversationRepository
      .createQueryBuilder()
      .where('coversation_id = :coversation_id', { coversation_id })
      .getOne();
  }

  findAll(limit: number): Promise<CoversationInterface[]> {
    return this.conversationRepository.find({
      take: limit,
    });
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

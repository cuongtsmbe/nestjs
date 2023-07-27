import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CoversationsService } from './coversation.service';
import { CreateCoversationDto } from './dtos/create.dto';
import { UpdateCoversationDto } from './dtos/update.dto';
import { CoversationInterface } from './coversation.interface';

@Controller('coversations')
export class CoversationController {
  constructor(private readonly coversationsService: CoversationsService) {}

  @Post()
  async create(@Body() dtoCoversation: CreateCoversationDto) {
    const res = await this.coversationsService.create(dtoCoversation);
    if (!res) {
      return 'error in creating coversation';
    }
    return 'coversation created successfully';
  }

  @Get(':conversation_id')
  async findByID(@Param('conversation_id') conversation_id: bigint) {
    if (isNaN(Number(conversation_id))) {
      // ID must be number
      return 'Invalid id';
    }
    const conversation: CoversationInterface =
      await this.coversationsService.find(conversation_id);
    return conversation;
  }

  @Get()
  async findAll(@Query('limit', ParseIntPipe) limit: number) {
    const coversations: Array<CoversationInterface> =
      await this.coversationsService.findAll(limit);
    return coversations;
  }

  @Put(':coversation_id')
  async update(
    @Param('coversation_id') coversation_id: bigint,
    @Body() body: UpdateCoversationDto,
  ) {
    const newCoversation: any = await this.coversationsService.update(
      coversation_id,
      body,
    );
    return newCoversation;
  }

  @Delete(':coversation_id')
  async remove(@Param('coversation_id') coversation_id: bigint) {
    const resultDel = await this.coversationsService.delete(coversation_id);
    return resultDel;
  }
}

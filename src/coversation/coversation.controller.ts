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

  @Get(':id')
  async findByID(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      // ID must be number
      return 'Invalid id';
    }
    const conversation: CoversationInterface[] =
      await this.coversationsService.find(id);
    return conversation;
  }

  @Get()
  async findAll(@Query('limit', ParseIntPipe) limit: number) {
    const coversations: Array<CoversationInterface> =
      await this.coversationsService.findAll(limit);
    return coversations;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCoversationDto) {
    const newCoversation: any = await this.coversationsService.update(id, body);
    return newCoversation;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const resultDel = await this.coversationsService.delete(id);
    return resultDel;
  }
}

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
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create.dto';
import { MessageInterface } from './message.interface';
import { UpdateMessageDto } from './dtos/update.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() dtoMessage: CreateMessageDto) {
    const res = await this.messageService.create(dtoMessage);
    if (!res) {
      return 'error in creating coversation';
    }
    return 'coversation created successfully';
  }

  @Get(':id')
  async findByID(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      return 'Invalid id';
    }
    const conversation: MessageInterface[] = await this.messageService.find(id);
    return conversation;
  }

  @Get()
  async findAll(@Query('limit', ParseIntPipe) limit: number) {
    const conversations: Array<MessageInterface> =
      await this.messageService.findAll(limit);
    return conversations;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMessageDto) {
    const newCoversation: any = await this.messageService.update(id, body);
    return newCoversation;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const resultDel = await this.messageService.delete(id);
    return resultDel;
  }
}

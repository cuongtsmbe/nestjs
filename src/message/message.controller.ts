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
      return false;
    }
    return true;
  }

  @Get(':message_id')
  async findByID(@Param('message_id', ParseIntPipe) message_id: bigint) {
    if (isNaN(Number(message_id))) {
      return 'Invalid message_id';
    }
    const message: MessageInterface = await this.messageService.find(
      message_id,
    );
    return message;
  }

  @Get()
  async findByCoversationID(
    @Param('coversation_id') coversation_id: bigint,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const messages: Array<MessageInterface> =
      await this.messageService.findByCoversationID(coversation_id, limit);
    return messages;
  }

  @Put(':message_id')
  async update(
    @Param('message_id') message_id: bigint,
    @Body() body: UpdateMessageDto,
  ) {
    const message: any = await this.messageService.update(message_id, body);
    return message;
  }

  @Delete(':message_id')
  async remove(@Param('message_id') message_id: bigint) {
    const resultDel = await this.messageService.delete(message_id);
    return resultDel;
  }
}

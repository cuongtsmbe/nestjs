import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create.dto';
import { MessageInterface } from './message.interface';
import { UpdateMessageDto } from './dtos/update.dto';
import { CoversationsService } from 'src/coversation/coversation.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly coversationsService: CoversationsService,
  ) {}

  @Post()
  async create(@Body() dtoMessage: CreateMessageDto) {
    const conversation = await this.coversationsService.find(
      dtoMessage.coversation_id,
    );
    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }

    const res = await this.messageService.create(dtoMessage);
    if (!res) {
      //500 Internal Server Error
      throw new HttpException(
        'Failed to create message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    //201 Created
    return {
      status: HttpStatus.CREATED,
      message: 'Message created successfully!',
      data: res,
    };
  }

  @Get(':message_id')
  async findByID(@Param('message_id') message_id: bigint) {
    const message: MessageInterface = await this.messageService.find(
      message_id,
    );

    if (!message) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Get message successfully!',
      data: message,
    };
  }

  @Get()
  async findByCoversationID(
    @Param('coversation_id') coversation_id: bigint,
    @Query('limit') limit: number,
  ) {
    const conversation = await this.coversationsService.find(coversation_id);
    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }
    const messages: Array<MessageInterface> =
      await this.messageService.findByCoversationID(coversation_id, limit);
    return {
      status: HttpStatus.CREATED,
      message: 'Get messages by coversation successfully!',
      data: messages,
    };
  }

  @Put(':message_id')
  async update(
    @Param('message_id') message_id: bigint,
    @Body() body: UpdateMessageDto,
  ) {
    const resultMessage: any = await this.messageService.update(
      message_id,
      body,
    );

    if (!resultMessage) {
      throw new HttpException('Failed update message', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'update message successfully!',
      data: resultMessage,
    };
  }

  @Delete(':message_id')
  async remove(@Param('message_id') message_id: bigint) {
    const resultDel = await this.messageService.delete(message_id);

    if (!resultDel) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      description: 'Message deleted successfully!',
      data: resultDel,
    };
  }
}

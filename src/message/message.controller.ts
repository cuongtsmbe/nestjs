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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create.dto';
import { MessageInterface } from './message.interface';
import { UpdateMessageDto } from './dtos/update.dto';
import { CoversationsService } from 'src/coversation/coversation.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly coversationsService: CoversationsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ status: 401, description: 'create message fail!' })
  // @UsePipes(ValidationPipe)
  async create(@Body() dtoMessage: CreateMessageDto, @Req() req) {
    //check coversation_id exist in DB
    const e = await this.coversationsService.checkCoversationID(
      dtoMessage.coversation_id,
    );
    if (!e) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }

    dtoMessage.user_id = req.user_data.user_id;
    //create message
    const res = await this.messageService.create(dtoMessage);
    if (!res) {
      //500 Internal Server Error
      throw new HttpException(
        'Failed to create message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: HttpStatus.CREATED,
      message: 'Message created successfully!',
      data: res,
    };
  }

  @UseGuards(AuthGuard)
  @Get('one/:message_id')
  async findByID(@Param('message_id') message_id: bigint, @Req() req) {
    const message: MessageInterface = await this.messageService.getOne(
      message_id,
      req.user_data.user_id,
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

  @UseGuards(AuthGuard)
  @Get('list/:coversation_id')
  async GetListByCoversationID(
    @Param('coversation_id') coversation_id: bigint,
    @Query('limit') limit: number,
    @Req() req,
  ) {
    const messages: Array<MessageInterface> =
      await this.messageService.GetListByCoversationID(
        coversation_id,
        req.user_data.user_id,
        limit,
      );

    return {
      status: HttpStatus.CREATED,
      message: 'Get messages by coversation successfully!',
      data: messages,
    };
  }

  @UseGuards(AuthGuard)
  @Put(':message_id')
  @ApiResponse({ status: 401, description: 'update message fail!' })
  @UsePipes(ValidationPipe)
  async update(
    @Param('message_id') message_id: bigint,
    @Body() body: UpdateMessageDto,
    @Req() req,
  ) {
    if (body.user_id != req.user_data.user_id) {
      throw new HttpException(
        'Failed update message',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
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

  @UseGuards(AuthGuard)
  @Delete(':message_id')
  async remove(@Param('message_id') message_id: bigint, @Req() req) {
    //check message is of user
    const getMessage = await this.messageService.getOne(
      message_id,
      req.user_data.user_id,
    );
    if (!getMessage) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }
    //delete message
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

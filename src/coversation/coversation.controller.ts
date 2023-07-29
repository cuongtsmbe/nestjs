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
import { CoversationsService } from './coversation.service';
import { CreateCoversationDto } from './dtos/create.dto';
import { UpdateCoversationDto } from './dtos/update.dto';
import { CoversationInterface } from './coversation.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dtos/create.dto';

@Controller('coversations')
export class CoversationController {
  constructor(
    private readonly coversationsService: CoversationsService,
    private readonly messageService: MessageService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'create coversation successfully!' })
  @ApiResponse({ status: 401, description: 'create coversation fail!' })
  // @UsePipes(ValidationPipe)
  async create(@Body() dtoCoversation: CreateCoversationDto, @Req() req) {
    if (!dtoCoversation.members.includes(req.user_data.user_id)) {
      dtoCoversation.members.push(req.user_data.user_id);
    }

    const res = await this.coversationsService.create(dtoCoversation);
    if (!res) {
      //500 Internal Server Error
      throw new HttpException(
        'Failed to create coversation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    //create message for coversation
    const messExam: CreateMessageDto = {
      coversation_id: res.coversation_id,
      user_id: req.user_data.user_id,
      type: 0,
      message: 'hello!',
      timestamp: new Date(),
      status: 0,
    };
    await this.messageService.create(messExam);

    //201 Created
    return {
      status: HttpStatus.CREATED,
      message: 'Coversation created successfully!',
      data: res,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':conversation_id')
  async findByID(
    @Param('conversation_id') conversation_id: bigint,
    @Req() req,
  ) {
    const conversation: CoversationInterface =
      await this.coversationsService.findOneCoversation(
        conversation_id,
        req.user_data.user_id,
      );

    if (!conversation) {
      throw new HttpException('conversation not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Get conversation successfully!',
      data: conversation,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async getListCoversation(@Query('limit') limit: number, @Req() req) {
    const coversations: Array<CoversationInterface> =
      await this.coversationsService.GetListCoversationByUserID(
        req.user_data.user_id,
        limit,
      );

    return {
      status: HttpStatus.CREATED,
      message: 'Get all coversations of user successfully!',
      data: coversations,
    };
  }

  @Put(':coversation_id')
  @ApiResponse({ status: 401, description: 'update coversation fail!' })
  @UsePipes(ValidationPipe)
  async update(
    @Param('coversation_id') coversation_id: bigint,
    @Body() body: UpdateCoversationDto,
  ) {
    const newCoversation: any = await this.coversationsService.update(
      coversation_id,
      body,
    );
    if (!newCoversation) {
      throw new HttpException(
        'Failed update coversation',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'update coversation successfully!',
      data: newCoversation,
    };
  }

  @Delete(':coversation_id')
  async remove(@Param('coversation_id') coversation_id: bigint) {
    const resultDel = await this.coversationsService.delete(coversation_id);
    if (!resultDel) {
      throw new HttpException('Coversation not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      description: 'Coversation deleted successfully!',
      data: resultDel,
    };
  }
}

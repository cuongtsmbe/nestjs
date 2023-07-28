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
      //500 Internal Server Error
      throw new HttpException(
        'Failed to create coversation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    //201 Created
    return {
      status: HttpStatus.CREATED,
      message: 'Coversation created successfully!',
      data: res,
    };
  }

  @Get(':conversation_id')
  async findByID(@Param('conversation_id') conversation_id: bigint) {
    const conversation: CoversationInterface =
      await this.coversationsService.find(conversation_id);

    if (!conversation) {
      throw new HttpException('conversation not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Get conversation successfully!',
      data: conversation,
    };
  }

  @Get()
  async findAll(@Query('limit') limit: number) {
    const coversations: Array<CoversationInterface> =
      await this.coversationsService.findAll(limit);

    return {
      status: HttpStatus.CREATED,
      message: 'Get all coversations successfully!',
      data: coversations,
    };
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

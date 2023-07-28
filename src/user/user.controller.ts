import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.dto';
import { UserInterface } from './user.interface';
import { UpdateUserDto } from './dtos/update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dtoUser: CreateUserDto) {
    const res = await this.userService.create(dtoUser);

    if (!res) {
      //500 Internal Server Error
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    //201 Created
    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully!',
      data: res,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':user_id')
  async findByUserID(@Param('user_id') user_id: bigint) {
    const user: UserInterface = await this.userService.findByUserID(user_id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Get user successfully!',
      data: user,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('limit') limit: number) {
    const users: UserInterface[] = await this.userService.findAll(limit);
    return {
      status: HttpStatus.CREATED,
      message: 'Get users all successfully!',
      data: users,
    };
  }

  @UseGuards(AuthGuard)
  @Put(':user_id')
  async update(@Param('user_id') user_id: bigint, @Body() body: UpdateUserDto) {
    const user: any = await this.userService.update(user_id, body);
    if (!user) {
      throw new HttpException('Failed update user ', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'update user successfully!',
      data: user,
    };
  }
}

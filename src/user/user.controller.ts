import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.dto';
import { UserInterface } from './user.interface';
import { UpdateUserDto } from './dtos/update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dtoUser: CreateUserDto) {
    const res = await this.userService.create(dtoUser);
    if (!res) {
      return false;
    }
    return true;
  }

  @Get(':user_id')
  async findByUserID(@Param('user_id', ParseIntPipe) user_id: bigint) {
    if (isNaN(Number(user_id))) {
      return 'Invalid id';
    }
    const user: UserInterface = await this.userService.findByUserID(user_id);
    return user;
  }

  @Get()
  async findAll(@Query('limit', ParseIntPipe) limit: number) {
    const users: UserInterface[] = await this.userService.findAll(limit);
    return users;
  }

  @Put(':user_id')
  async update(@Param('user_id') user_id: bigint, @Body() body: UpdateUserDto) {
    const user: any = await this.userService.update(user_id, body);
    return user;
  }
}

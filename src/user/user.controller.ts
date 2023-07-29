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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.dto';
import { UserInterface } from './user.interface';
import { UpdateUserDto } from './dtos/update.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiResponse({ status: 401, description: 'create user fail!' })
  @UsePipes(ValidationPipe)
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

  @Get()
  async findAll(@Query('limit') limit: number) {
    const users: UserInterface[] = await this.userService.findAll(limit);
    return {
      status: HttpStatus.CREATED,
      message: 'Get users all successfully!',
      data: users,
    };
  }

  //get users near me with maxdistance (KM)
  @UseGuards(AuthGuard)
  @Get('near-me')
  async GetUsersNearMe(
    @Query('limit') limit: number,
    @Query('maxdistance') maxdistance: number,
    @Req() req,
  ) {
    const me = await this.userService.findByUserID(req.user_data.user_id);
    if (!me) {
      throw new HttpException('user exist found', HttpStatus.NOT_FOUND);
    }
    const users: UserInterface[] = await this.userService.findUsersNearLocation(
      me.user_id,
      me.lat,
      me.lng,
      maxdistance,
      limit,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Get users near me successfully!',
      data: users,
    };
  }

  @UseGuards(AuthGuard)
  @Put(':user_id')
  @ApiResponse({ status: 401, description: 'update user fail!' })
  @UsePipes(ValidationPipe)
  async update(
    @Param('user_id') user_id: bigint,
    @Body() body: UpdateUserDto,
    @Req() req,
  ) {
    if (req.user_data.user_id != user_id) {
      throw new HttpException('Failed update user ', HttpStatus.NOT_ACCEPTABLE);
    }
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

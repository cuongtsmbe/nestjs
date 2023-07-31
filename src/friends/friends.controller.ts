import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateFriendsdto } from './dtos/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FriendsInterface } from './friends.interface';

@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @UseGuards(AuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'create related friends successfully!' })
    @ApiResponse({ status: 401, description: 'create related friends fail!' })
    // @UsePipes(ValidationPipe)
    async create(@Body() dtoCreateFriends: CreateFriendsdto, @Req() req) {
        if(req.user_data.user_id!=dtoCreateFriends.user_id_1 && req.user_data.user_id!=dtoCreateFriends.user_id_2){
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'bad request . relate friend fail!',
            };
        }
        const res = await this.friendsService.create(dtoCreateFriends);
        if (!res) {
        //500 Internal Server Error
        throw new HttpException(
            'Failed to create relate friends ',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
        //201 Created
        return {
            status: HttpStatus.CREATED,
            message: 'relate friend created successfully!',
            data: res,
        };
    }


    @UseGuards(AuthGuard)
    @Get('/user/related')
    async findRelatedUser(
        @Query('type') type: number,
        @Req() req,
    ) {
        const results: FriendsInterface[] =
        await this.friendsService.findRelatedFriends(
            req.user_data.user_id,
            type
        );

        if (results.length==0) {
            throw new HttpException(' not found any related user', HttpStatus.NOT_FOUND);
        }

        return {
            status: HttpStatus.OK,
            message: 'Gets related user successfully!',
            data: results,
        };
    }



    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiResponse({ status: 401, description: 'update relate friends fail!' })
    // @UsePipes(ValidationPipe)
    async update(
        @Param('id') id: number,
        @Query('type') type: number,
        @Req() req
    ) {
        const detailsByID:FriendsInterface=await this.friendsService.findOneByID(id);

        if(!detailsByID || (detailsByID.user_id_1!=req.user_data.user_id && detailsByID.user_id_2!=req.user_data.user_id)){
            throw new HttpException(
                'Failed update relate friends',
                HttpStatus.UNAUTHORIZED,
            );
        }
        const updateResults: any = await this.friendsService.updateFriendsType(id,{type: type});
        if (!updateResults) {
            throw new HttpException(
                'Failed update relate friends',
                HttpStatus.NOT_FOUND,
            );
        }

        return {
        status: HttpStatus.OK,
        message: 'update related successfully!',
        data: updateResults,
        };
    }
}

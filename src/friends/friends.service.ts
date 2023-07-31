import { Injectable } from '@nestjs/common';
import { Friends } from './friends.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendsdto } from './dtos/create.dto';
import { FriendsInterface } from './friends.interface';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(Friends)
        private friendsRepository: Repository<Friends>,
    ) {}

    create(friends: CreateFriendsdto): Promise<any> {
        return this.friendsRepository.save(
          this.friendsRepository.create(friends),
        );
    }

    async findRelatedFriends(
        user_id: bigint,
        type:number
      ): Promise<FriendsInterface[]> {
        //check coversation id is of user_id login
        const relatedFriends: FriendsInterface[] = await this.friendsRepository
          .createQueryBuilder()
          .where('user_id_1 = :user_id_1 OR user_id_2 = :user_id_1', {user_id})
          .andWhere('type= :type',{type})
          .getMany();
        return relatedFriends;
    }
    

    //type : 1 (A gửi lời mời kết bạn với B )
    //type : 2 (B gửi lời mời kết bạn với A )
    //type : 3 (B không chấp nhận kết bạn A )
    //type : 4 (A không chấp nhận kết bạn B )
    //type : 5 (A và B không còn là bạn)
    //type : 6 (A và B là bạn)
    updateFriendsType(id:number, data: {type: number}): Promise<any> {
        return this.friendsRepository
          .createQueryBuilder()
          .update()
          .set(data)
          .where('id = :id', { id })
          .execute();
    }

    async findOneByID(
        id: number,
      ): Promise<FriendsInterface> {
        return this.friendsRepository
          .createQueryBuilder()
          .where('id = :id', {
            id,
          })
          .getOne();
      }
    
}

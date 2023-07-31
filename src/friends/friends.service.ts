import { Injectable } from '@nestjs/common';
import { Friends } from './friends.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(Friends)
        private conversationRepository: Repository<Friends>,
    ) {}
}

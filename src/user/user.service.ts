import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';
import { UserInterface } from './user.interface';
import { UpdateUserDto } from './dtos/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(userDto: CreateUserDto): Promise<any> {
    return this.userRepository.save(this.userRepository.create(userDto));
  }

  findByUserID(user_id: bigint): Promise<UserInterface[]> {
    return this.userRepository.find({ where: { user_id } });
  }

  findAll(limit: number): Promise<UserInterface[]> {
    return this.userRepository.find({
      take: limit,
    });
  }

  update(user_id: bigint, data: UpdateUserDto): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('user_id = :user_id', { user_id })
      .execute();
  }
}

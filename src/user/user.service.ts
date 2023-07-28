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

  async findByUserID(user_id: bigint): Promise<UserInterface> {
    const resultUser: UserInterface & { password: string } =
      await this.userRepository.findOne({ where: { user_id } });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resultWithoutPassword } = resultUser;
    return resultWithoutPassword;
  }

  async findAll(limit: number): Promise<UserInterface[]> {
    const resultUsers: (UserInterface & { password: string })[] =
      await this.userRepository.find({
        take: limit,
      });
    return this.deletePasswordInUser(resultUsers);
  }

  update(user_id: bigint, data: UpdateUserDto): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('user_id = :user_id', { user_id })
      .execute();
  }

  // Định nghĩa hàm để lấy danh sách người dùng gần location
  async findUsersNearLocation(
    user_id: bigint,
    myLat: string,
    myLng: string,
    maxDistance: number,
    limit: number,
  ): Promise<UserInterface[]> {
    // Tính toán khoảng cách tối đa trong đơn vị độ
    const maxDistanceInDegree = maxDistance / 111.12;

    const usersNear: (UserInterface & { password: string })[] =
      await this.userRepository
        .createQueryBuilder('user')
        .select()
        .where('user.user_id != :user_id', { user_id })
        .andWhere(`ABS(user.lat - :myLat) <= :maxDistanceInDegree`, {
          myLat,
          maxDistanceInDegree,
        })
        .andWhere(`ABS(user.lng - :myLng) <= :maxDistanceInDegree`, {
          myLng,
          maxDistanceInDegree,
        })
        .take(limit)
        .getMany();

    return this.deletePasswordInUser(usersNear);
  }

  deletePasswordInUser(
    u: (UserInterface & { password: string })[],
  ): UserInterface[] {
    const resultWithoutPassword: UserInterface[] = u.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, ...rest }) => rest,
    );
    return resultWithoutPassword;
  }
}

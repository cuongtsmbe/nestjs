import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oauth } from './oauth.entity';
import { Repository } from 'typeorm';
import { CreateOauthDto } from './dtos/create.dto';
import { UpdateOauthDto } from './dtos/update.dto';
import { OauthInterface } from './oauth.interface';

@Injectable()
export class OauthService {
  constructor(
    @InjectRepository(Oauth)
    private oauthRepository: Repository<Oauth>,
  ) {}

  create(oauth: CreateOauthDto): Promise<any> {
    return this.oauthRepository.save(this.oauthRepository.create(oauth));
  }

  findTokenByUserID(
    user_id: bigint,
    access_token: string,
  ): Promise<OauthInterface> {
    return this.oauthRepository
      .createQueryBuilder()
      .where('oauth.user_id = :user_id', { user_id })
      .andWhere('oauth.access_token = :access_token', { access_token })
      .getOne();
  }

  update(id: number, data: UpdateOauthDto): Promise<any> {
    return this.oauthRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  delete(id: number): Promise<any> {
    return this.oauthRepository
      .createQueryBuilder()
      .delete()
      .from(Oauth)
      .where('id = :id', { id })
      .execute();
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { Oauth } from 'src/oauth/oauth.entity';
import { CreateOauthDto } from 'src/oauth/dtos/create.dto';
import { TokenDto } from './dtos/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Oauth)
    private oauthRepository: Repository<Oauth>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const hashPassword = await this.hashPassword(registerUserDto.password);

    return await this.userRepository.save({
      ...registerUserDto,
      password: hashPassword,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    //generate access token and refresh token
    const payload = { user_id: user.user_id, email: user.email };
    return this.generateToken(payload);
  }

  private async generateToken(payload: TokenDto) {

    //create token
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET_ACCESS_TOKEN'),
      expiresIn: this.configService.get<string>('EXP_IN_ACCESS_TOKEN'),
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
    });

    const oauth: CreateOauthDto = {
      user_id: payload.user_id,
      access_token: access_token,
      status: 1,
      timestamp: new Date(),
    };
    //add new accesstoken in oauth
    await this.oauthRepository.save(this.oauthRepository.create(oauth));
    return { access_token, refresh_token };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET_REFRESH_TOKEN'),
      });
      const checkExistUser = await this.userRepository.findOneBy({
        user_id: verify.user_id,
        email: verify.email,
      });
      if (checkExistUser) {
        return this.generateToken({
          user_id: verify.user_id,
          email: verify.email,
        });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getUserFromAuthenticationToken(token: string) {
    try {
      const payload = this.jwtService.decode(token);

      return payload;
    } catch {
      throw new HttpException(
        {
          status: 419,
          message: 'Token expired',
        },
        419,
      );
    }
  }

}

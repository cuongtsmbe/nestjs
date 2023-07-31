import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/user.entity';
import { AuthService } from './ auth.service';
import { ConfigService } from '@nestjs/config';
import { Oauth } from 'src/oauth/oauth.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Oauth]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('SECRET_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('EXP_IN_ACCESS_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
  exports:[AuthService]
})
export class AuthModule {}

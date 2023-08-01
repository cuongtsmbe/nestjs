import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { AuthService } from 'src/auth/ auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/ auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Oauth } from 'src/oauth/oauth.entity';
import { ChatGateway } from './chats.gateway';
import { ElasticService } from 'elasticsearch/elastic.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticModule } from 'elasticsearch/elastic.module';

@Module({
  
  imports:[AuthModule,

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
    ElasticModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsService, AuthService,ChatGateway]
})
export class ChatsModule {}

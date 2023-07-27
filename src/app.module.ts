import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoversationModule } from './coversation/coversation.module';
import * as path from 'path';
import { MessageModule } from './message/message.module';
import { OauthModule } from './oauth/oauth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cuong1',
      password: 'cuong1',
      database: 'chat',
      entities: [path.join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    }),
    CoversationModule,
    MessageModule,
    OauthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./ auth.service";

@Module({
    import:[UserModule],
    controllers: [authController],
  providers: [AuthService],
  })
  export class authModule {}
  
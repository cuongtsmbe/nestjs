import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Headers,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './ auth.service';
import { UserInterface } from 'src/user/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    const authResult: UserInterface & { password } =
      await this.authService.register(registerUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resultWithoutPassword } = authResult;
    return resultWithoutPassword;
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successfully!' })
  @ApiResponse({ status: 401, description: 'Login fail!' })
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  //generate new token
  accessToken(@Headers('authorization') authorization: string): Promise<any> {
    const [type, refresh_token] = authorization ? authorization.split(' ') : [];
    if (type !== 'Bearer' || !refresh_token) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.refreshToken(refresh_token);
  }
}

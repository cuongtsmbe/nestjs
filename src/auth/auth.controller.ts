import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Headers,
  HttpStatus,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from './ auth.service';
import { UserInterface } from 'src/user/user.interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  //@UsePipes(ValidationPipe)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    const userExist: UserInterface = await this.userService.findByEmail(
      registerUserDto.email,
    );
    if (!registerUserDto.email || userExist != null) {
      throw new ConflictException(
        'Email address already exists OR email empty.',
      );
    }
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

  @Post('refreshtoken')
  //generate new token
  accessToken(@Headers('authorization') authorization: string): Promise<any> {
    const [type, refresh_token] = authorization ? authorization.split(' ') : [];
    if (type !== 'Bearer' || !refresh_token) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.refreshToken(refresh_token);
  }
}

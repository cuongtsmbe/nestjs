import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './ auth.service';
import { UserInterface } from 'src/user/user.interface';

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
}

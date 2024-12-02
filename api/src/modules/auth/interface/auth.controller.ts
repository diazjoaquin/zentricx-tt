import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDTO } from '../application/dto/auth.dto';
import { AuthService } from '../application/service/auth.service';
import { RegisterDto } from '../application/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async signIn(@Body() body: AuthDTO) {
    return await this.authService.signIn(body.email);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('register')
  async signUp(@Body() body: RegisterDto) {
    return await this.authService.signUp(body);
  }
}
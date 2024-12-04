import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/application/service/user.service';
import { BcryptService } from 'src/modules/user/infrastructure/security/bcrypt.service';
import { AuthDTO } from '../dto/auth.dto';
import { AuthError } from '../exceptions/auth.errors';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService, 
  ) {}

  async validateUser (authDto: AuthDTO): Promise<any> {
    const user = await this.userService.findByEmail(authDto.email);

    if (user && await this.bcryptService.compare(authDto.password, user.password)) {
      return {
        name: user.name,
        email: user.email
      }
    };
  }

  async authenticate (authDto: AuthDTO): Promise<{ access_token: string }> {
    const user = await this.validateUser(authDto);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    };

    return this.signIn(user.email);
  };

  async signIn(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AuthError.WRONG_PASSWORD);
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      ...payload
    };
  };

  async signUp (registerDto: RegisterDto): Promise<{ access_token: string }> {
    const user = await this.userService.create(registerDto);
    return this.signIn(user.email);
  };
}
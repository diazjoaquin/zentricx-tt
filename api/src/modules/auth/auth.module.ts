import { Module } from '@nestjs/common';
import { UserService } from '../user/application/service/user.service';
import { UserMapper } from '../user/application/mapper/user.mapper';
import { USER_REPOSITORY } from '../user/application/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserPostgresRepository } from '../user/infrastructure/persistence/user.postgres.repository';
import { AuthController } from './interface/auth.controller';
import { AuthService } from './application/service/auth.service';
import { UserSchema } from '../user/infrastructure/persistence/user.schema';
import { BcryptService } from '../user/infrastructure/security/bcrypt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    BcryptService,
    AuthService,
    UserService,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: UserPostgresRepository,
    },
  ],
})
export class AuthModule {}
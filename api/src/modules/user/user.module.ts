import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "./infrastructure/persistence/user.schema";
import { UserController } from "./interface/user.controller";
import { UserService } from "./application/service/user.service";
import { UserMapper } from "./application/mapper/user.mapper";
import { USER_REPOSITORY } from "./application/repository/user.repository";
import { UserPostgresRepository } from "./infrastructure/persistence/user.postgres.repository";
import { BcryptService } from "./infrastructure/security/bcrypt.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    JwtService,
    BcryptService,
    UserService,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: UserPostgresRepository,
    },
  ],
  exports: [
    BcryptService,
    UserService,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: UserPostgresRepository,
    },
  ],
})

export class UserModule {}

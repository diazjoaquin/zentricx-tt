import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../../domain/user.domain";
import { Repository } from "typeorm";
import { UserSchema } from "./user.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { BcryptService } from "../security/bcrypt.service";

@Injectable()
export class UserPostgresRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail (email: string) {
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });

    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userEntity;
  }

  async create(user: CreateUserDto) {
    const userFounded = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userFounded) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this.bcryptService.hash(user.password);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    })
    return await this.userRepository.save(newUser);
  }
}
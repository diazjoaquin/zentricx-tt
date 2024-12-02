import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY } from "../repository/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserService implements IUserRepository {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: IUserRepository,
  ) {}

  async create (user: CreateUserDto) {
    return await this.userRepository.create(user);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByEmail (email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
import { User } from "../../domain/user.domain";
import { CreateUserDto } from "../dto/create-user.dto";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  create(user: CreateUserDto): Promise<User>;
}
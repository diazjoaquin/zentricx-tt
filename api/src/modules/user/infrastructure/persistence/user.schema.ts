import { EntitySchema } from "typeorm";
import { User } from "../../domain/user.domain";
import { BaseColumnSchemas } from "src/common/infrastructure/persistence/base.schema";

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    ...BaseColumnSchemas,
    name: {
      name: 'name',
      type: 'varchar'
    },
    email: {
      name: 'email',
      type: 'varchar',
      unique: true
    },
    password: {
      name: 'password',
      type: 'varchar'
    },
  }
});
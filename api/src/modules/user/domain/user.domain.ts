import { Base } from "src/common/domain/base.domain";
import { Role } from "./role.enum";

export class User extends Base {
  name: string;
  email: string;
  password: string;
  role: Role;
}
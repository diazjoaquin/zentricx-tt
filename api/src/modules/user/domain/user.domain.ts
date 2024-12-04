import { Base } from "src/common/domain/base.domain";

export class User extends Base {
  name: string;
  email: string;
  password: string;
}
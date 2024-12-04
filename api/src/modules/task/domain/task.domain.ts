import { Base } from "src/common/domain/base.domain";
import { State } from "./state.enum";
import { UUID } from "crypto";

export class Task extends Base {
  createdBy: UUID;
  name: string;
  description: string;
  state?: State;
}
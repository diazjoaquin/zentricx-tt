import { UUID } from "crypto";
import { State } from "../utils/state.enum";

export interface ITask {
  createdBy: UUID,
  id?: UUID,
  name: string,
  description: string,
  state: State,
}
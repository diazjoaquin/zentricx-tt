import { ITask } from "../interfaces/ITask";

export function fromTaskFormToData (
  formValues: ITask,
) {
  return {
    createdBy: formValues.createdBy,
    name: formValues.name,
    description: formValues.description,
    state: formValues.state
  }
}
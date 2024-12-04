import { EntitySchema } from "typeorm";
import { Task } from "../../domain/task.domain";
import { State } from "../../domain/state.enum";
import { BaseColumnSchemas } from "src/common/infrastructure/persistence/base.schema";

export const TaskSchema = new EntitySchema<Task>({
  name: 'Task',
  target: Task,
  columns: {
    ...BaseColumnSchemas,
    name: {
      name: 'name',
      type: 'varchar'
    },
    description: {
      name: 'description',
      type: 'varchar'
    },
    state: {
      name: 'state',
      type: 'enum',
      enum: State
    }
  },
  relations: {
    createdBy: {
      type: 'many-to-one',
      target: 'User',
      cascade: true,
      onDelete: 'CASCADE',
      joinColumn: {
        name: 'createdBy',
      }
    }
  }
})
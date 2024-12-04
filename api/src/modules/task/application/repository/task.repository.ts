import { UpdateTaskDto } from "../dto/update-task.dto";
import { Task } from "../../domain/task.domain";
import { UUID } from "crypto";

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface ITaskRepository {
  createTask(task: Task): Promise<Task>;
  getAllTasksByUserId(userId: UUID): Promise<Task[]>;
  getTaskById(userId: UUID, id: UUID): Promise<Task>;
  updateTask(id: UUID, task: UpdateTaskDto): Promise<Task>;
  deleteTask(id: UUID): Promise<boolean>;
}
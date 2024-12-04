import { Inject, Injectable } from "@nestjs/common";
import { ITaskRepository, TASK_REPOSITORY } from "../repository/task.repository";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Task } from "../../domain/task.domain";
import { UUID } from "crypto";
import { TaskMapper } from "../mapper/task.mapper";

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
    @Inject(TaskMapper)
    private readonly taskMapper: TaskMapper,
  ) {}

  async createTask(task: CreateTaskDto): Promise<Task> {
    const taskEntity = this.taskMapper.fromDtoToEntity(task);
    return await this.taskRepository.createTask(taskEntity);
  }

  async updateTask(id: UUID, task: UpdateTaskDto): Promise<UpdateTaskDto> {
    return await this.taskRepository.updateTask(id, task);
  }

  async deleteTask(id: UUID): Promise<boolean> {
    return await this.taskRepository.deleteTask(id);
  }

  async getAllTasksByUserId(userId: UUID): Promise<Task[]> {
    return await this.taskRepository.getAllTasksByUserId(userId);
  }

  async getTaskById(userId: UUID, id: UUID): Promise<Task> {
    return await this.taskRepository.getTaskById(userId, id);
  }
}
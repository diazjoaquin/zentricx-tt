import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ITaskRepository } from "../../application/repository/task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskSchema } from "./task.schema";
import { Equal, Repository } from "typeorm";
import { Task } from "../../domain/task.domain";
import { UUID } from "crypto";
import { UserSchema } from "src/modules/user/infrastructure/persistence/user.schema";
import { User } from "src/modules/user/domain/user.domain";

@Injectable()
export class TaskPostgresRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskSchema)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTask (task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async updateTask(id: UUID, task: Task): Promise<Task> {
    const foundedTask = await this.taskRepository.findOne({
      where: { id },
      relations: ['createdBy'], 
    });
    

    if (!foundedTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const updatedTask = this.taskRepository.create({
      ...foundedTask,
      ...task,
      id
    });

    return this.taskRepository.save(updatedTask, { reload: true });
  }

  async deleteTask(id: UUID): Promise<boolean> {
    const foundedTask = await this.taskRepository.findOne({
      where: { id }
    });

    if (!foundedTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    await this.taskRepository.delete(id);
    return true;
  }

  async getAllTasksByUserId(userId: UUID): Promise<Task[]> {
    const foundedUser = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })

    if (!foundedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const tasks = await this.taskRepository.find({
      where: {
        createdBy: Equal(userId)
      },
      relations: ['createdBy']
    });
  
    return tasks;
  }

  async getTaskById (userId: UUID, id: UUID): Promise<Task> {
    const foundedUser = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })

    if (!foundedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const task = await this.taskRepository.findOne({
      where: { 
        createdBy: userId
      },
      relations: ['createdBy']
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }
}
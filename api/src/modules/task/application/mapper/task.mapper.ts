import { Injectable } from "@nestjs/common";
import { Task } from "../../domain/task.domain";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { State } from "../../domain/state.enum";

@Injectable()
export class TaskMapper {
  public fromDtoToEntity(taskDto: CreateTaskDto | UpdateTaskDto): Task {
    const newTask = new Task();
    newTask.createdBy = taskDto.createdBy;
    newTask.name = taskDto.name;
    newTask.description = taskDto.description;
    newTask.state = State.PENDING;
    return newTask;
  }
}
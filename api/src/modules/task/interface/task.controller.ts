import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "../application/service/task.service";
import { CreateTaskDto } from "../application/dto/create-task.dto";
import { UpdateTaskDto } from "../application/dto/update-task.dto";
import { UUID } from "crypto";
import { AuthGuard } from "src/modules/auth/application/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return await this.taskService.createTask(task);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: UUID, 
    @Body() task: UpdateTaskDto) {
    return await this.taskService.updateTask(id, task);
  }

  @Get('/user/:userId')
  async getAllTasksByUserId(@Param('userId') id: UUID) {
    return await this.taskService.getAllTasksByUserId(id);
  }

  @Get('/:id/user/:userId')
  async getTaskById(@Param('userId') userId: UUID, @Param('id') id: UUID) {
    return await this.taskService.getTaskById(userId, id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: UUID) {
    return await this.taskService.deleteTask(id);
  }
}
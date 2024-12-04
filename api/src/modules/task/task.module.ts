import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskSchema } from "./infrastructure/persistence/task.schema";
import { TaskMapper } from "./application/mapper/task.mapper";
import { TaskService } from "./application/service/task.service";
import { TASK_REPOSITORY } from "./application/repository/task.repository";
import { TaskPostgresRepository } from "./infrastructure/persistence/task.postgres.repository";
import { TaskController } from "./interface/task.controller";
import { UserSchema } from "../user/infrastructure/persistence/user.schema";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchema, UserSchema]),
  forwardRef(() => UserModule),
  JwtModule
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskMapper,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskPostgresRepository,
    },
  ],
  exports: [
    TaskService,
    TaskMapper,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskPostgresRepository,
    },
  ],
})
export class TaskModule {}
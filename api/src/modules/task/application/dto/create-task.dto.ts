import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { State } from "../../domain/state.enum";
import { UUID } from "crypto";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsUUID()
  createdBy: UUID;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(State)
  @IsOptional()
  state: State;
}
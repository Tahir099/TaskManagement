import { Task } from "../generated/prisma";
import { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import { ITaskService } from "./interfaces/ITaskService";

export class TaskService implements ITaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}
  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}

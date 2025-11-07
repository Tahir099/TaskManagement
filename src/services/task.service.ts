import { Task } from "../generated/prisma";
import { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import { ITaskService } from "./interfaces/ITaskService";
import { Service, Inject } from "typedi";

@Service("TaskService")
export class TaskService implements ITaskService {
  constructor(@Inject("TaskRepository") private readonly taskRepository: ITaskRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
  createTask(data: Partial<Task>): Promise<Task> {
    return this.taskRepository.create(data);
  }
}

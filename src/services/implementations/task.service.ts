import { Task  , Board} from "../../generated/prisma";
import { ITaskRepository } from "../../repositories/interfaces/ITaskRepository";
import { ITaskService } from "../interfaces/ITaskService";

export class TaskService implements ITaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}
  createTask(data: Partial<Task>): Promise<Task> {
    return this.taskRepository.create(data);
  }

  async getTaskWithBoard(
    taskId: string
  ): Promise<(Task & { board: Board }) | null> {
    return this.taskRepository.findByIdWithBoard(taskId);
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    return this.taskRepository.update(taskId, data);
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.taskRepository.delete(taskId);
  }
}

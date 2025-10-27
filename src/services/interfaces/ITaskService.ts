import { Task } from "../../generated/prisma";

export interface ITaskService {
  getAllTasks(): Promise<Task[]>;
  createTask(data: Partial<Task>): Promise<Task>;
  // getTaskById(id: string): Promise<Task>;
}

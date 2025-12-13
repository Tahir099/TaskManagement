import { Task , Board } from "../../generated/prisma";

export interface ITaskService {
  createTask(data: Partial<Task>): Promise<Task>;
  getTaskWithBoard(taskId: string): Promise<(Task & { board: Board }) | null>;
  updateTask(taskId: string, data: Partial<Task>): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
}

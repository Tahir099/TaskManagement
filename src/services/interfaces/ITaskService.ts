import { Task } from "../../generated/prisma";

export interface ITaskService {
  createTask(data: Partial<Task>): Promise<Task>;
}

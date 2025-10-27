import { Task } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface ITaskRepository extends IBaseRepository<Task> {
  findByUserId(userId: string): Promise<Task[] | null>;
}

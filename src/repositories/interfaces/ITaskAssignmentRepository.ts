import { TaskAssignment } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface ITaskAssignmentRepository extends IBaseRepository<TaskAssignment> {
  findByTaskId(taskId: string): Promise<TaskAssignment[]>;
  findByUserId(userId: string): Promise<TaskAssignment[]>;
  findByTaskAndUser(taskId: string, userId: string): Promise<TaskAssignment | null>;
  deleteByTaskAndUser(taskId: string, userId: string): Promise<void>;
}


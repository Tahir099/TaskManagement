import { Task, Board, TaskAssignment } from "../../generated/prisma";
import { TaskWithAssignments } from "../../repositories/interfaces/ITaskRepository";

export interface ITaskService {
  createTask(data: Partial<Task>): Promise<Task>;
  getTaskWithBoard(taskId: string): Promise<(Task & { board: Board }) | null>;
  getTaskWithAssignments(taskId: string): Promise<TaskWithAssignments | null>;
  updateTask(taskId: string, data: Partial<Task>): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
  assignUserToTask(taskId: string, userId: string): Promise<TaskAssignment>;
  unassignUserFromTask(taskId: string, userId: string): Promise<void>;
  getTaskAssignments(taskId: string): Promise<TaskAssignment[]>;
}

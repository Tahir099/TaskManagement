import { Task, Board, TaskAssignment } from "../../generated/prisma";
import { ITaskRepository, TaskWithAssignments } from "../../repositories/interfaces/ITaskRepository";
import { ITaskService } from "../interfaces/ITaskService";
import { ITaskAssignmentRepository } from "../../repositories/interfaces/ITaskAssignmentRepository";
import { AppError } from "../../errors/AppError";

export class TaskService implements ITaskService {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly taskAssignmentRepository: ITaskAssignmentRepository
  ) {}

  createTask(data: Partial<Task>): Promise<Task> {
    return this.taskRepository.create(data);
  }

  async getTaskWithBoard(
    taskId: string
  ): Promise<(Task & { board: Board }) | null> {
    return this.taskRepository.findByIdWithBoard(taskId);
  }

  async getTaskWithAssignments(taskId: string): Promise<TaskWithAssignments | null> {
    return this.taskRepository.findByIdWithAssignments(taskId);
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    return this.taskRepository.update(taskId, data);
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.taskRepository.delete(taskId);
  }

  async assignUserToTask(taskId: string, userId: string): Promise<TaskAssignment> {
    const existingAssignment = await this.taskAssignmentRepository.findByTaskAndUser(taskId, userId);
    if (existingAssignment) {
      throw new AppError("User is already assigned to this task", 400);
    }

    return this.taskAssignmentRepository.create({
      taskId,
      userId,
    });
  }

  async unassignUserFromTask(taskId: string, userId: string): Promise<void> {
    const assignment = await this.taskAssignmentRepository.findByTaskAndUser(taskId, userId);
    if (!assignment) {
      throw new AppError("Assignment not found", 404);
    }

    await this.taskAssignmentRepository.deleteByTaskAndUser(taskId, userId);
  }

  async getTaskAssignments(taskId: string): Promise<TaskAssignment[]> {
    return this.taskAssignmentRepository.findByTaskId(taskId);
  }
}

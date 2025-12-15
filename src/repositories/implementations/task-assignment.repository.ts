import prisma from "../../config/prisma.config";
import { TaskAssignment } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { ITaskAssignmentRepository } from "../interfaces/ITaskAssignmentRepository";

export class TaskAssignmentRepository
  extends BaseRepository<TaskAssignment>
  implements ITaskAssignmentRepository
{
  constructor() {
    super(prisma.taskAssignment);
  }

  async findByTaskId(taskId: string): Promise<TaskAssignment[]> {
    return this.prismaModel.findMany({
      where: { taskId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<TaskAssignment[]> {
    return this.prismaModel.findMany({
      where: { userId },
      include: {
        task: true,
      },
    });
  }

  async findByTaskAndUser(
    taskId: string,
    userId: string
  ): Promise<TaskAssignment | null> {
    return this.prismaModel.findFirst({
      where: {
        taskId,
        userId,
      },
    });
  }

  async deleteByTaskAndUser(taskId: string, userId: string): Promise<void> {
    await this.prismaModel.deleteMany({
      where: {
        taskId,
        userId,
      },
    });
  }
}


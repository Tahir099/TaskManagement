import prisma from "../../config/prisma.config";
import { Task } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { ITaskRepository } from "../interfaces/ITaskRepository";

export class TaskRepository
  extends BaseRepository<Task>
  implements ITaskRepository
{
  constructor() {
    super(prisma.task);
  }

  async findByUserId(userId: string): Promise<Task[] | null> {
    return this.prismaModel.findMany({
      where: { creatorId: userId },
    });
  }
}

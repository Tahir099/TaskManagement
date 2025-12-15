import prisma from "../../config/prisma.config";
import { Task, Board } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { ITaskRepository, TaskWithAssignments } from "../interfaces/ITaskRepository";

export class TaskRepository
  extends BaseRepository<Task>
  implements ITaskRepository
{
  constructor() {
    super(prisma.task);
  }

  async findByIdWithBoard(
    id: string
  ): Promise<(Task & { board: Board }) | null> {
    return this.prismaModel.findUnique({
      where: { id },
      include: {
        board: true,
      },
    });
  }

  async findByIdWithAssignments(id: string): Promise<TaskWithAssignments | null> {
    return this.prismaModel.findUnique({
      where: { id },
      include: {
        assignments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}

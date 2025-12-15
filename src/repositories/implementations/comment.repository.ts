import prisma from "../../config/prisma.config";
import { Comment, Task, Board } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { ICommentRepository } from "../interfaces/ICommentRepository";

export class CommentRepository
  extends BaseRepository<Comment>
  implements ICommentRepository
{
  constructor() {
    super(prisma.comment);
  }

  async findByTaskId(taskId: string): Promise<Comment[]> {
    return this.prismaModel.findMany({
      where: { taskId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByIdWithUser(
    id: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } }) | null
  > {
    return this.prismaModel.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findByTaskIdWithUser(
    taskId: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } })[]
  > {
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
      orderBy: { createdAt: "desc" },
    });
  }

  async findByIdWithTask(
    id: string
  ): Promise<(Comment & { task: Task & { board: Board } }) | null> {
    return this.prismaModel.findUnique({
      where: { id },
      include: {
        task: {
          include: {
            board: true,
          },
        },
      },
    });
  }

  async deleteAllByTaskId(taskId: string): Promise<void> {
    await this.prismaModel.deleteMany({
      where: {
        taskId,
      },
    });
  }
}

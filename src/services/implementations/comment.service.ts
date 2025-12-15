import { AppError } from "../../errors/AppError";
import { Comment, Task, Board } from "../../generated/prisma";
import { ICommentRepository } from "../../repositories/interfaces/ICommentRepository";
import { ICommentService } from "../interfaces/ICommentService";

export class CommentService implements ICommentService {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async createComment(
    taskId: string,
    userId: string,
    content: string
  ): Promise<Comment> {
    return this.commentRepository.create({
      content,
      taskId,
      userId,
    });
  }

  async getCommentsByTaskId(
    taskId: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } })[]
  > {
    return this.commentRepository.findByTaskIdWithUser(taskId);
  }

  async getCommentById(
    id: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } }) | null
  > {
    const comment = await this.commentRepository.findByIdWithUser(id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    return comment;
  }

  async getCommentWithTask(
    id: string
  ): Promise<
    (Comment & { task: Task & { board: Board } }) | null
  > {
    const comment = await this.commentRepository.findByIdWithTask(id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    return comment;
  }

  async updateComment(id: string, content: string): Promise<Comment> {
    const existing = await this.commentRepository.findById(id);
    if (!existing) {
      throw new AppError("Comment not found", 404);
    }

    return this.commentRepository.update(id, { content });
  }

  async deleteComment(id: string): Promise<void> {
    const existing = await this.commentRepository.findById(id);
    if (!existing) {
      throw new AppError("Comment not found", 404);
    }

    await this.commentRepository.delete(id);
  }

  async deleteAllCommentsByTaskId(taskId: string): Promise<void> {
    await this.commentRepository.deleteAllByTaskId(taskId);
  }
}

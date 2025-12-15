import { Comment, Task, Board } from "../../generated/prisma";

export interface ICommentService {
  createComment(
    taskId: string,
    userId: string,
    content: string
  ): Promise<Comment & { user: { id: string; name: string; email: string } }>;

  getCommentsByTaskId(
    taskId: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } })[]
  >;
  getCommentById(
    id: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } }) | null
  >;

  getCommentWithTask(
    id: string
  ): Promise<
    (Comment & { task: Task & { board: Board } }) | null
  >;

  updateComment(id: string, content: string): Promise<Comment>;
  deleteComment(id: string): Promise<void>;
  deleteAllCommentsByTaskId(taskId: string): Promise<void>;
}

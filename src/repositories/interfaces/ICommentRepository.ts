import { Comment, Task, Board } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface ICommentRepository extends IBaseRepository<Comment> {
  findByTaskId(taskId: string): Promise<Comment[]>;
  findByIdWithUser(id: string): Promise<
    | (Comment & {
        user: { id: string; name: string; email: string };
      })
    | null
  >;

  findByTaskIdWithUser(
    taskId: string
  ): Promise<
    (Comment & { user: { id: string; name: string; email: string } })[]
  >;
  
  findByIdWithTask(
    id: string
  ): Promise<(Comment & { task: Task & { board: Board } }) | null>;
  
  deleteAllByTaskId(taskId: string): Promise<void>;
}

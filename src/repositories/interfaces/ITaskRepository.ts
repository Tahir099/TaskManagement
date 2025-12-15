import { Task, Board, TaskAssignment, User } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export type TaskWithAssignments = Task & {
  assignments: (TaskAssignment & { user: { id: string; name: string; email: string } })[];
};

export interface ITaskRepository extends IBaseRepository<Task> {
  findByIdWithBoard(id: string): Promise<(Task & { board: Board }) | null>;
  findByIdWithAssignments(id: string): Promise<TaskWithAssignments | null>;
}

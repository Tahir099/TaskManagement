import { Task  , Board} from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface ITaskRepository extends IBaseRepository<Task> {
  findByIdWithBoard(id: string): Promise<(Task & { board: Board }) | null>;
}

import { Board } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface IBoardRepository extends IBaseRepository<Board>{
}
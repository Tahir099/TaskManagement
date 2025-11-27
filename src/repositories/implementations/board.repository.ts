import { Board } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { IBoardRepository } from "../interfaces/IBoardRepository";
import prisma from "../../config/prisma.config";

export class BoardRepository
  extends BaseRepository<Board>
  implements IBoardRepository
{
  constructor() {
    super(prisma.board);
  }
}

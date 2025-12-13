import { Board } from "../../generated/prisma";
import { IBoardService } from "../interfaces/IBoardService";
import { IBoardRepository } from "../../repositories/interfaces/IBoardRepository";

export class BoardService implements IBoardService {
  constructor(private readonly boardRepository: IBoardRepository) {}
  async create(name: string, organizationId: string): Promise<Board> {
    return this.boardRepository.create({
      name,
      organizationId,
    });
  }

  async getBoardsByOrganizationId(organizationId: string): Promise<Board[]> {
    return this.boardRepository.findByOrganizationId(organizationId);
  }

  async getBoardById(boardId: string): Promise<Board | null> {
    return this.boardRepository.findById(boardId);
  }
}

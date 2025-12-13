import { Board } from "../../generated/prisma";

export interface IBoardService {
  create(name: string, organizationId: string): Promise<Board>;
  getBoardsByOrganizationId(organizationId: string): Promise<Board[]>;
  getBoardById(boardId: string): Promise<Board | null>;
}

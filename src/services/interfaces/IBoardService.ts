import { Board } from "@prisma/client";

export interface IBoardService {
  create(name: string, organizationId: string): Promise<Board>;
  getBoardsByOrganizationId(organizationId: string): Promise<Board[]>;
}

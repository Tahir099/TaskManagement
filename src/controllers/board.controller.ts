import { GuardedRequest } from "../guards/types";
import { asyncHandler } from "../middlewares/asyncHandler";
import { IBoardService } from "../services/interfaces/IBoardService";
import { Request, Response } from "express";

export class BoardController {
  constructor(private readonly boardService: IBoardService) {}

  create = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const { name } = req.body;
    const organizationId = req.orgContext!.organizationId;
    const board = await this.boardService.create(name, organizationId);
    res.status(201).json(board);
  });

  getByOrganization = asyncHandler(
    async (req: GuardedRequest, res: Response) => {
      const organizationId = req.orgContext!.organizationId;

      const boards = await this.boardService.getBoardsByOrganizationId(
        organizationId
      );

      res.status(200).json(boards);
    }
  );
}

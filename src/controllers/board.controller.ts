import { asyncHandler } from "../middlewares/asyncHandler";
import { IBoardService } from "../services/interfaces/IBoardService";
import { Request, Response } from "express";

export class BoardController {
  constructor(private readonly boardService: IBoardService) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const { name, organizationId } = req.body;
    const board = await this.boardService.create(name, organizationId);
    res.status(201).json(board);
  });

  getByOrganization = asyncHandler(async (req: Request, res: Response) => {
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(400).json({ message: "Organization ID is required" });
      return;
    }

    const boards = await this.boardService.getBoardsByOrganizationId(
      organizationId
    );

    res.status(200).json(boards);
  });
}

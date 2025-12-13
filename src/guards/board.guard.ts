import { NextFunction, Response } from "express";
import { PermissionKey } from "../constants/permissions";
import { AppError } from "../errors/AppError";
import { IMemberShipService } from "../services/implementations/membership.service";
import { IBoardService } from "../services/interfaces/IBoardService";
import { GuardedRequest } from "./types";

interface BoardGuardOptions {
  permission: PermissionKey;
  source?: "params" | "body" | "query";
  paramName?: string; // Default: "boardId"
}

export class BoardGuard {
  constructor(
    private readonly boardService: IBoardService,
    private readonly membershipService: IMemberShipService
  ) {}

  require(options: BoardGuardOptions) {
    const { permission, source = "params", paramName = "boardId" } = options;

    return async (req: GuardedRequest, _res: Response, next: NextFunction) => {
      try {
        if (!req.user?.id) throw new AppError("Unauthorized", 401);

        // Board ID-ni tap
        let boardId: string | undefined;
        if (source === "body") boardId = req.body[paramName];
        else if (source === "query") boardId = req.query[paramName] as string;
        else boardId = req.params[paramName];

        if (!boardId) throw new AppError(`${paramName} required`, 400);

        // Board-ı DB-dən gətir (OrganizationId lazımdır)
        const board = await this.boardService.getBoardById(boardId);
        if (!board) throw new AppError("Board not found", 404);

        // Üzvlüyü və İcazəni yoxla (Board-ın aid olduğu təşkilatda)
        const membership = await this.membershipService.getMembership(
          board.organizationId,
          req.user.id
        );
        this.membershipService.validatePermission(membership, permission);

        req.orgContext = {
          organizationId: board.organizationId,
          userId: req.user.id,
          role: membership.role,
          memberShipId: membership.id,
          membership: membership,
        };

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}


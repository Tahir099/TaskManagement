import { NextFunction, Response } from "express";
import { PermissionKey } from "../constants/permissions";
import { AppError } from "../errors/AppError";
import { IMemberShipService } from "../services/implementations/membership.service";
import { ICommentService } from "../services/interfaces/ICommentService";
import { GuardedRequest } from "./types";

interface CommentGuardOptions {
  permission: PermissionKey;
  paramName?: string;
}

export class CommentGuard {
  constructor(
    private readonly commentService: ICommentService,
    private readonly membershipService: IMemberShipService
  ) {}

  require(options: CommentGuardOptions) {
    const { permission, paramName = "id" } = options;

    return async (req: GuardedRequest, _res: Response, next: NextFunction) => {
      try {
        if (!req.user?.id) throw new AppError("Unauthorized", 401);

        const commentId = req.params[paramName];
        if (!commentId) throw new AppError(`${paramName} required`, 400);

        const comment = await this.commentService.getCommentWithTask(commentId);
        
        if (!comment || !comment.task || !comment.task.board) {
          throw new AppError("Comment not found", 404);
        }

        const membership = await this.membershipService.getMembership(
          comment.task.board.organizationId,
          req.user.id
        );
        this.membershipService.validatePermission(membership, permission);

        req.orgContext = {
          organizationId: comment.task.board.organizationId,
          userId: req.user.id,
          role: membership.role,
          memberShipId: membership.id,
          membership: membership,
        };
        
        req.comment = comment;

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}


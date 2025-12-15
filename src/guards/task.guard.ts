import { NextFunction, Response } from "express";
import { PermissionKey } from "../constants/permissions";
import { AppError } from "../errors/AppError";
import { IMemberShipService } from "../services/implementations/membership.service";
import { ITaskService } from "../services/interfaces/ITaskService";
import { GuardedRequest } from "./types";

interface TaskGuardOptions {
  permission: PermissionKey;
  source?: "params" | "body" | "query";
  paramName?: string; 
}

export class TaskGuard {
  constructor(
    private readonly taskService: ITaskService,
    private readonly membershipService: IMemberShipService
  ) {}

  require(options: TaskGuardOptions) {
    const { permission, source = "params", paramName = "taskId" } = options;

    return async (req: GuardedRequest, _res: Response, next: NextFunction) => {
      try {
        if (!req.user?.id) throw new AppError("Unauthorized", 401);

        let taskId: string | undefined;
        if (source === "body") taskId = req.body[paramName];
        else if (source === "query") taskId = req.query[paramName] as string;
        else taskId = req.params[paramName];

        if (!taskId) throw new AppError(`${paramName} required`, 400);

        const task = await this.taskService.getTaskWithBoard(taskId);
        
        if (!task || !task.board) {
          throw new AppError("Task not found", 404);
        }

        const membership = await this.membershipService.getMembership(
          task.board.organizationId,
          req.user.id
        );
        this.membershipService.validatePermission(membership, permission);

        req.orgContext = {
          organizationId: task.board.organizationId,
          userId: req.user.id,
          role: membership.role,
          memberShipId: membership.id,
          membership: membership,
        };
        
        req.task = task;

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

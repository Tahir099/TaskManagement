import { NextFunction, Response } from "express";
import { OrganizationRole } from "../constants/permissions";
import { AuthenticatedRequest } from "../middlewares/authorize";
import { MembershipInfo } from "../services/implementations/membership.service";
import { Board, Task, Comment as PrismaComment } from "@prisma/client";

export interface OrganizationContext {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  memberShipId: string;
  membership: MembershipInfo;
}


export interface GuardedRequest extends AuthenticatedRequest {
  orgContext?: OrganizationContext;
  task?: Task & { board: { organizationId: string } };
  comment?: PrismaComment & { task: Task & { board: Board } };
}

export type Guard = (
  req: GuardedRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

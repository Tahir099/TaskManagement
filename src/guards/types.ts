import { NextFunction, Response } from "express";
import { OrganizationRole } from "../constants/permissions";
import { AuthenticatedRequest } from "../middlewares/authorize";

export interface OrganizationContext {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  memberShipId: string;
}

export interface GuardedRequest extends AuthenticatedRequest {
  orgContext?: OrganizationContext;
}

export type Guard = (
  req: GuardedRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

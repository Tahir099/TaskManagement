import { NextFunction, Response } from "express";
import { OrganizationRole } from "../constants/permissions";
import { AuthenticatedRequest } from "../middlewares/authorize";
import { MembershipInfo } from "../services/implementations/membership.service";

export interface OrganizationContext {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  memberShipId: string;
  membership: MembershipInfo;
}

export interface GuardedRequest extends AuthenticatedRequest {
  orgContext?: OrganizationContext;
}

export type Guard = (
  req: GuardedRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

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

import { Task } from "../../generated/prisma";

export interface GuardedRequest extends AuthenticatedRequest {
  orgContext?: OrganizationContext;
  task?: Task & { board: { organizationId: string } };
}

export type Guard = (
  req: GuardedRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

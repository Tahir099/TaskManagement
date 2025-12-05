import { NextFunction , Response } from "express";
import { PermissionKey } from "../constants/permissions";
import { IMemberShipService } from "../services/membership.service";
import { extractOrgId, OrgIdSource } from "./extractors/org-id.extractor";
import { GuardedRequest } from "./types";
import { AppError } from "../errors/AppError";

interface OrgGuardOptions {
  permission: PermissionKey;
  source?: OrgIdSource;
  paramName?: string;
}

export class OrganizationGuard {
  constructor(private readonly memberShipService: IMemberShipService) {}

  require(options: OrgGuardOptions) {
    const {
      permission,
      source = "params",
      paramName = "organizationId",
    } = options;

    return async (
      req: GuardedRequest,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        if (!req.user?.id) {
          throw new AppError("Authentication required", 401);
        }

        const orgId = extractOrgId(req, source, paramName);

        if (!orgId) {
          throw new AppError(`${paramName} is required`, 400);
        }

        const memberShip = await this.memberShipService.getMembership(
          orgId,
          req.user.id
        );

        this.memberShipService.validatePermission(memberShip, permission);

        req.orgContext = {
          organizationId: orgId,
          userId: req.user.id,
          role: memberShip.role,
          memberShipId: memberShip.id,
        };
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  requireMemberShip(
    source: OrgIdSource = "params",
    paramName = "organizationId"
  ) {
    return async (
      req: GuardedRequest,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        if (!req.user?.id) {
          throw new AppError("Authentication required", 401);
        }

        const orgId = extractOrgId(req, source, paramName);
        if (!orgId) {
          throw new AppError(`${paramName} is required`, 400);
        }

        const memberShip = await this.memberShipService.getMembership(
          orgId,
          req.user.id
        );

        req.orgContext = {
          organizationId: orgId,
          userId: req.user.id,
          role: memberShip.role,
          memberShipId: memberShip.id,
        };

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

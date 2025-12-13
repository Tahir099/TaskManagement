import { NextFunction, Response } from "express";
import { PermissionKey } from "../constants/permissions";
import { IMemberShipService } from "../services/implementations/membership.service";
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

  private async resolveOrgContext(
    req: GuardedRequest,
    source: OrgIdSource,
    paramName: string
  ) {
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

    return {
      organizationId: orgId,
      userId: req.user.id,
      role: memberShip.role,
      memberShipId: memberShip.id,
      membership: memberShip,
    };
  }

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
        const context = await this.resolveOrgContext(req, source, paramName);
        req.orgContext = context;
        this.memberShipService.validatePermission(
          context.membership,
          permission
        );
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  requireMemberShip(
    source: OrgIdSource = "params",
    paramName: string = "organizationId"
  ) {
    return async (
      req: GuardedRequest,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        req.orgContext = await this.resolveOrgContext(req, source, paramName);
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}
  
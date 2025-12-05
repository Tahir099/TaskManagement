import {
  OrganizationRole,
  PermissionKey,
  Permissions,
} from "../constants/permissions";
import { AppError } from "../errors/AppError";
import { IOrganizationMemberRepository } from "../repositories/interfaces/IOrganizationMemberRepository";

export interface MembershipInfo {
  id: string;
  orgId: string;
  userId: string;
  role: OrganizationRole;
}

export interface IMemberShipService {
  getMembership(orgId: string, userId: string): Promise<MembershipInfo>;
  hasPermission(role: OrganizationRole, permission: PermissionKey): boolean;
  validatePermission(
    membership: MembershipInfo,
    permission: PermissionKey
  ): void;
}

export class MemberShipService implements IMemberShipService {
  constructor(private readonly memberRepo: IOrganizationMemberRepository) {}

  async getMembership(orgId: string, userId: string): Promise<MembershipInfo> {
    const memberShip = await this.memberRepo.findMemberShip(orgId, userId);
    if (!memberShip) {
      throw new AppError("You are not a member of this organization", 403);
    }

    return {
      id: memberShip.id,
      orgId: memberShip.orgId,
      userId: memberShip.userId,
      role: memberShip.role as OrganizationRole,
    };
  }

  hasPermission(role: OrganizationRole, permission: PermissionKey): boolean {
    const allowedRoles = Permissions[permission];
    return allowedRoles.includes(role);
  }

  validatePermission(
    membership: MembershipInfo,
    permission: PermissionKey
  ): void {
    if (!this.hasPermission(membership.role, permission)) {
      const allowedRoles = Permissions[permission];
      throw new AppError(
        `Permission denied. Required: ${allowedRoles.join(", ")}. your role: ${
          membership.role
        }`,
        403
      );
    }
  }
}

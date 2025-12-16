import { OrganizationMember, OrganizationRole } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface IOrganizationMemberRepository
  extends IBaseRepository<OrganizationMember> {
  addMember(
    organizationId: string,
    userId: string,
    role?: OrganizationRole
  ): Promise<OrganizationMember>;

  findMemberShip(
    organizationId: string,
    userId: string
  ): Promise<OrganizationMember | null>;

  updateRole(
    organizationId: string,
    userId: string,
    newRole: OrganizationRole
  ): Promise<OrganizationMember>;

  removeMember(organizationId: string, userId: string): Promise<void>;
  findByOrganizationId(organizationId: string): Promise<OrganizationMember[]>;
}

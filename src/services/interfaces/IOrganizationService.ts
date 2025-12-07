import {
  Organization,
  OrganizationMember,
  OrganizationRole,
} from "../../generated/prisma";

export interface IOrganizationService {
  createOrganization(
    data: Partial<Organization>,
    creatorId: string
  ): Promise<Organization>;
  getByUserId(userId: string): Promise<Organization[]>;
  addMember(
    organizationId: string,
    userId: string
  ): Promise<OrganizationMember>;

  removeMember(organizationId: string, userId: string): Promise<void>;
  changeMemberRole(
    organizationId: string,
    userId: string,
    newRole: OrganizationRole
  ): Promise<OrganizationMember>;

  deleteOrganization(organizationId: string): Promise<void>;
  updateOrganization(
    organizationId: string,
    data: Partial<Organization>
  ): Promise<Organization>;
}

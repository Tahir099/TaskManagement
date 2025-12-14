import {
  Organization,
  OrganizationMember,
  OrganizationRole,
  User,
} from "../../generated/prisma";

export interface OrganizationMemberWithUser extends OrganizationMember {
  user: Pick<User, "id" | "name" | "email">;
}

export interface IOrganizationService {
  createOrganization(
    data: Partial<Organization>,
    creatorId: string
  ): Promise<Organization>;
  getByUserId(userId: string): Promise<Organization[]>;
  getOrganizationWithMembers(organizationId: string): Promise<{
    organization: Organization;
    members: OrganizationMemberWithUser[];
  }>;
  addMemberByEmail(
    organizationId: string,
    email: string
  ): Promise<OrganizationMemberWithUser>;

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

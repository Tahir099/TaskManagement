import { OrganizationMember } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface IOrganizationMemberRepository
  extends IBaseRepository<OrganizationMember> {
  addMember(
    organizationId: string,
    userId: string
  ): Promise<OrganizationMember>;
}

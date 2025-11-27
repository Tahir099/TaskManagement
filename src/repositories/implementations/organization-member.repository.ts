import prisma from "../../config/prisma.config";
import { OrganizationMember } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { IOrganizationMemberRepository } from "../interfaces/IOrganizationMemberRepository";

export class OrganizationMemberRepository
  extends BaseRepository<OrganizationMember>
  implements IOrganizationMemberRepository
{
  constructor() {
    super(prisma.organizationMember);
  }

  async addMember(
    organizationId: string,
    userId: string
  ): Promise<OrganizationMember> {
    return this.prismaModel.create({
      data: {
        orgId: organizationId,
        userId,
      },
    });
  }
}

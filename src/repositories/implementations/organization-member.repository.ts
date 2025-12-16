import prisma from "../../config/prisma.config";
import { OrganizationMember, OrganizationRole } from "../../generated/prisma";
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
    userId: string,
    role: OrganizationRole = "MEMBER"
  ): Promise<OrganizationMember> {
    return this.prismaModel.create({
      data: {
        orgId: organizationId,
        userId,
        role,
      },
    });
  }

  async findMemberShip(
    organizationId: string,
    userId: string
  ): Promise<OrganizationMember | null> {
    return this.prismaModel.findUnique({
      where: {
        orgId_userId: {
          orgId: organizationId,
          userId,
        },
      },
    });
  }
  async updateRole(
    organizationId: string,
    userId: string,
    newRole: OrganizationRole
  ): Promise<OrganizationMember> {
    return this.prismaModel.update({
      where: {
        orgId_userId: {
          orgId: organizationId,
          userId,
        },
      },
      data: { role: newRole },
    });
  }

  async removeMember(organizationId: string, userId: string): Promise<void> {
    await this.prismaModel.delete({
      where: {
        orgId_userId: {
          orgId: organizationId,
          userId,
        },
      },
    });
  }

  async findByOrganizationId(
    organizationId: string
  ): Promise<OrganizationMember[]> {
    return this.prismaModel.findMany({
      where: {
        orgId: organizationId,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    }) as any;
  }
}

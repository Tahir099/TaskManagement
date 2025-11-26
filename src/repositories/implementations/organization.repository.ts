import prisma from "../../config/prisma.config";
import { Organization } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { IOrganizationRepository } from "../interfaces/IOrganizationRepository";

export class OrganizationRepository
  extends BaseRepository<Organization>
  implements IOrganizationRepository
{
  constructor() {
    super(prisma.organization);
  }

  findByUserId(userId: string): Promise<Organization[]> {
    return this.prismaModel.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });
  }
}

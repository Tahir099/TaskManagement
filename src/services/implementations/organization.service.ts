import { AppError } from "../../errors/AppError";
import {
  Organization,
  OrganizationMember,
  OrganizationRole,
} from "../../generated/prisma";
import { IOrganizationMemberRepository } from "../../repositories/interfaces/IOrganizationMemberRepository";
import { IOrganizationRepository } from "../../repositories/interfaces/IOrganizationRepository";
import { IOrganizationService } from "../interfaces/IOrganizationService";

export class OrganizationService implements IOrganizationService {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly organizationMemberRepository: IOrganizationMemberRepository
  ) {}

  async createOrganization(
    data: Partial<Organization>,
    creatorId: string
  ): Promise<Organization> {
    const organization = await this.organizationRepository.create(data);
    await this.organizationMemberRepository.addMember(
      organization.id,
      creatorId,
      "OWNER"
    );

    return organization;
  }
  getByUserId(userId: string): Promise<Organization[]> {
    return this.organizationRepository.findByUserId(userId);
  }
  addMember(
    organizationId: string,
    userId: string
  ): Promise<OrganizationMember> {
    return this.organizationMemberRepository.addMember(organizationId, userId);
  }

  async removeMember(organizationId: string, userId: string): Promise<void> {
    const member = await this.organizationMemberRepository.findMemberShip(
      organizationId,
      userId
    );

    if (member?.role == "OWNER") {
      throw new AppError("Cannot remove the owner of the organization", 400);
    }

    await this.organizationMemberRepository.removeMember(
      organizationId,
      userId
    );
  }

  async changeMemberRole(
    organizationId: string,
    userId: string,
    newRole: OrganizationRole
  ): Promise<OrganizationMember> {
    const member = await this.organizationMemberRepository.findMemberShip(
      organizationId,
      userId
    );

    if (member?.role === "OWNER") {
      throw new AppError("Cannot change the role of the owner", 400);
    }
    if (newRole === "OWNER") {
      throw new AppError("Cannot assign OWNER role.", 400);
    }

    return this.organizationMemberRepository.updateRole(
      organizationId,
      userId,
      newRole
    );
  }

  async deleteOrganization(organizationId: string): Promise<void> {
    await this.organizationRepository.delete(organizationId);
  }

  async updateOrganization(
    organizationId: string,
    data: Partial<Organization>
  ): Promise<Organization> {
    return this.organizationRepository.update(organizationId, data);
  }
}

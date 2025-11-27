import { Organization, OrganizationMember } from "../generated/prisma";
import { IOrganizationMemberRepository } from "../repositories/interfaces/IOrganizationMemberRepository";
import { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import { IOrganizationService } from "./interfaces/IOrganizationService";

export class OrganizationService implements IOrganizationService {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly organizationMemberRepository: IOrganizationMemberRepository
  ) {}

  createOrganization(data: Partial<Organization>): Promise<Organization> {
    return this.organizationRepository.create(data);
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
}

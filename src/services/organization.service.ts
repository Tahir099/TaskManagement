import { Organization } from "../generated/prisma";
import { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import { IOrganizationService } from "./interfaces/IOrganizationService";

export class OrganizationService implements IOrganizationService {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  createOrganization(data: Partial<Organization>): Promise<Organization> {
    return this.organizationRepository.create(data);
  }
  getByUserId(userId: string): Promise<Organization[]> {
    return this.organizationRepository.findByUserId(userId);
  }
}

import { Organization } from "../../generated/prisma";

export interface IOrganizationService {
  createOrganization(data: Partial<Organization>): Promise<Organization>;
  getByUserId(userId: string): Promise<Organization[]>;
}

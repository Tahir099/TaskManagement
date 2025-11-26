import { Organization } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface IOrganizationRepository extends IBaseRepository<Organization> {
  findByUserId(userId: string): Promise<Organization[]>;
}

import { asyncHandler } from "../middlewares/asyncHandler";
import { AuthenticatedRequest } from "../middlewares/authorize";
import { IOrganizationService } from "../services/interfaces/IOrganizationService";
import { Request, Response } from "express";

export class OrganizationController {
  constructor(private readonly organizationService: IOrganizationService) {}
  create = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const organization = await this.organizationService.createOrganization(
      data
    );
    res.status(201).json(organization);
  });

  getByUserId = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const userId = req.user!.id;
      const organizations = await this.organizationService.getByUserId(userId);

      res.json(organizations);
    }
  );
}

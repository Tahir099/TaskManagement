import { asyncHandler } from "../middlewares/asyncHandler";
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
}

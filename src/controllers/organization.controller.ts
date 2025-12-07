import { Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { AuthenticatedRequest } from "../middlewares/authorize";
import { IOrganizationService } from "../services/interfaces/IOrganizationService";
import { GuardedRequest } from "../guards/types";

export class OrganizationController {
  constructor(private readonly organizationService: IOrganizationService) {}
  create = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body;
    const creatorId = req.user!.id;
    const organization = await this.organizationService.createOrganization(
      data,
      creatorId
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

  addMember = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const { userId } = req.body;
    const organizationId = req.orgContext!.organizationId;

    const organizationMember = await this.organizationService.addMember(
      organizationId,
      userId
    );

    res.status(201).json(organizationMember);
  });

  removeMember = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const { userId } = req.params;
    const organizationId = req.orgContext!.organizationId;

    await this.organizationService.removeMember(organizationId, userId);

    res.status(204).send();
  });

  changeMemberRole = asyncHandler(
    async (req: GuardedRequest, res: Response) => {
      const { userId } = req.params;
      const { role } = req.body;

      const organizationId = req.orgContext!.organizationId;

      const member = await this.organizationService.changeMemberRole(
        organizationId,
        userId,
        role
      );

      res.json(member);
    }
  );

  delete = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const organizationId = req.orgContext!.organizationId;
    await this.organizationService.deleteOrganization(organizationId);
    res.status(204).send();
  });

  update = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const organizationId = req.orgContext!.organizationId;
    const data = req.body;
    const organization = await this.organizationService.updateOrganization(
      organizationId,
      data
    );
    res.json(organization);
  });
}

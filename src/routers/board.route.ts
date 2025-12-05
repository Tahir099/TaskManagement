import { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { OrganizationGuard } from "../guards/organization.guard";

export function createBoardRouter(
  controller: BoardController,
  orgGuard: OrganizationGuard
) {
  const router = Router();

  router.post(
    "/",
    orgGuard.require({ permission: "CREATE_BOARD", source: "body" }),
    controller.create
  );
  router.get(
    "/organization/:organizationId",
    orgGuard.require({ permission: "VIEW_BOARD", source: "params" }),
    controller.getByOrganization
  );
  return router;
}

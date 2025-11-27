import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";

export function createOrganizationRouter(
  controller: OrganizationController
): Router {
  const router = Router();

  router.post("/", controller.create);
  router.get("/my", controller.getByUserId);
  router.post("/:organizationId/members", controller.addMember);
  return router;
}

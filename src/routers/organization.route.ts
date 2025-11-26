import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";

export function createOrganizationRouter(
  controller: OrganizationController
): Router {
  const router = Router();

  router.post("/", controller.create);
  return router;
}

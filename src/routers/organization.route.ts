import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";
import { OrganizationGuard } from "../guards/organization.guard";

export function createOrganizationRouter(
  controller: OrganizationController,
  orgGuard: OrganizationGuard
): Router {
  const router = Router();

  router.post("/", controller.create);
  router.get("/my", controller.getByUserId);

  router.get(
    "/:organizationId",
    orgGuard.requireMemberShip(),
    controller.getById
  );

  router.post(
    "/:organizationId/members",
    orgGuard.require({ permission: "INVITE_MEMBER" }),
    controller.addMember
  );

  router.delete(
    "/:organizationId/members/:userId",
    orgGuard.require({ permission: "REMOVE_MEMBER" }),
    controller.removeMember
  );

  router.patch(
    "/:organizationId/members/:userId/role",
    orgGuard.require({ permission: "CHANGE_MEMBER_ROLE" }),
    controller.changeMemberRole
  );

  router.delete(
    "/:organizationId",
    orgGuard.require({ permission: "DELETE_ORGANIZATION" }),
    controller.delete
  );

  router.patch(
    "/:organizationId",
    orgGuard.require({ permission: "UPDATE_ORGANIZATION" }),
    controller.update
  );
  return router;
}

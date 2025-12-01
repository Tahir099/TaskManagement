import { Router } from "express";
import { BoardController } from "../controllers/board.controller";

export function createBoardRouter(controller: BoardController) {
  const router = Router();

  router.post("/", controller.create);
  router.get("/organization/:organizationId", controller.getByOrganization);
  return router;
}

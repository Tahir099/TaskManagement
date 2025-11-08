import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export function createUserRouter(controller: UserController): Router {
  const router = Router();

  router.get("/", controller.getAll);
  router.get("/:id", controller.getByID);
  router.get("/email/:email", controller.getByEmail);
  router.post("/", controller.create);

  return router;
}
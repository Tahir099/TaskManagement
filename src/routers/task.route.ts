import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export function createTaskRouter(controller: TaskController): Router {
  const router = Router();

  router.post("/", controller.create);

  return router;
}
  
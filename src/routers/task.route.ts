import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { BoardGuard } from "../guards/board.guard";
import { TaskGuard } from "../guards/task.guard";

export function createTaskRouter(
  controller: TaskController,
  boardGuard: BoardGuard,
  taskGuard: TaskGuard
): Router {
  const router = Router();

  router.post(
    "/",
    boardGuard.require({
      permission: "CREATE_TASK",
      source: "body",
      paramName: "boardId",
    }),
    controller.create
  );

  router.patch(
    "/:taskId",
    taskGuard.require({
      permission: "UPDATE_TASK",
      paramName: "taskId",
    }),
    controller.update
  );

  router.delete(
    "/:taskId",
    taskGuard.require({
      permission: "DELETE_TASK",
      paramName: "taskId",
    }),
    controller.delete
  );

  return router;
}

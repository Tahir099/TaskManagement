import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { TaskGuard } from "../guards/task.guard";
import { CommentGuard } from "../guards/comment.guard";

export function createCommentRouter(
  controller: CommentController,
  taskGuard: TaskGuard,
  commentGuard: CommentGuard
) {
  const router = Router();

  router.post(
    "/",
    taskGuard.require({
      permission: "CREATE_COMMENT",
      source: "body",
      paramName: "taskId",
    }),
    controller.create
  );

  router.get(
    "/task/:taskId",
    taskGuard.require({
      permission: "VIEW_COMMENT",
      paramName: "taskId",
    }),
    controller.getByTaskId
  );

  router.get(
    "/:id",
    commentGuard.require({
      permission: "VIEW_COMMENT",
      paramName: "id",
    }),
    controller.getById
  );

  router.put(
    "/:id",
    commentGuard.require({
      permission: "UPDATE_COMMENT",
      paramName: "id",
    }),
    controller.update
  );

  router.delete(
    "/:id",
    commentGuard.require({
      permission: "DELETE_COMMENT",
      paramName: "id",
    }),
    controller.delete
  );

  return router;
}

import { Router } from "express";
import Container from "typedi";
import { TaskController } from "../controllers/task.controller";

export class TaskRouter {
  public readonly router: Router;
  public readonly controller: TaskController;

  constructor(controller: TaskController) {
    this.router = Router();
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
  }
}

export default new TaskRouter(Container.get(TaskController)).router;

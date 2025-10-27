import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import Container from "typedi";

export class UserRouter {
  public readonly router: Router;
  public readonly controller: UserController;

  constructor(controller: UserController = Container.get(UserController)) {
    this.router = Router();
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", this.controller.getByID);
    this.router.get("/email/:email", this.controller.getByEmail);
    this.router.post("/", this.controller.create);
  }
}

export default new UserRouter().router;

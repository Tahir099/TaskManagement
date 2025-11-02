import { Router } from "express";
import Container from "typedi";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  public readonly router: Router;
  public readonly controller: AuthController;

  constructor(controller: AuthController = Container.get(AuthController)) {
    this.router = Router();
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.controller.register);
  }
}

export default new AuthRouter().router;

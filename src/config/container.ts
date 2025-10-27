import { Container } from "typedi";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/implementations/user.repository";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

Container.set<IUserRepository>("UserRepository", new UserRepository());

Container.set<IUserService>(
  "UserService",
  new UserService(Container.get<IUserRepository>("UserRepository"))
);

Container.set(UserController, new UserController(Container.get<IUserService>("UserService")));

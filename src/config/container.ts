import { Container } from "typedi";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/implementations/user.repository";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import { TaskRepository } from "../repositories/implementations/task.repository";
import { ITaskService } from "../services/interfaces/ITaskService";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";

//User Container
Container.set<IUserRepository>("UserRepository", new UserRepository());
Container.set<IUserService>(
  "UserService",
  new UserService(Container.get<IUserRepository>("UserRepository"))
);
Container.set(
  UserController,
  new UserController(Container.get<IUserService>("UserService"))
);

//Task Container
Container.set<ITaskRepository>("TaskRepository", new TaskRepository());
Container.set<ITaskService>(
  "TaskService",
  new TaskService(Container.get<ITaskRepository>("TaskRepository"))
);

Container.set<TaskController>(
  "TaskController",
  new TaskController(Container.get<ITaskService>("TaskService"))
);

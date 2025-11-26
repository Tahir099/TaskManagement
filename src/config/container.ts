import { UserRepository } from "../repositories/implementations/user.repository";
import { TaskRepository } from "../repositories/implementations/task.repository";
import { SessionRepository } from "../repositories/implementations/session.repository";
import { UserService } from "../services/user.service";
import { TaskService } from "../services/task.service";
import { AuthService } from "../services/auth.service";
import { UserController } from "../controllers/user.controller";
import { TaskController } from "../controllers/task.controller";
import { AuthController } from "../controllers/auth.controller";
import { createUserRouter } from "../routers/user.route";
import { createTaskRouter } from "../routers/task.route";
import { createAuthRouter } from "../routers/auth.route";
import { createAuthenticateMiddleware } from "../middlewares/authorize";
import { OrganizationRepository } from "../repositories/implementations/organization.repository";
import { OrganizationService } from "../services/organization.service";
import { OrganizationController } from "../controllers/organization.controller";
import { createOrganizationRouter } from "../routers/organization.route";

// Repositories
const userRepository = new UserRepository();
const taskRepository = new TaskRepository();
const sessionRepository = new SessionRepository();
const organizationRepository = new OrganizationRepository();
       
// Services
const userService = new UserService(userRepository);
const taskService = new TaskService(taskRepository);
const authService = new AuthService(userRepository, sessionRepository);
const organizationService = new OrganizationService(organizationRepository);

// Controllers
const userController = new UserController(userService);
const taskController = new TaskController(taskService);
const authController = new AuthController(authService);
const organizationController = new OrganizationController(organizationService);

// Routers
export const userRouter = createUserRouter(userController);
export const taskRouter = createTaskRouter(taskController);
export const authRouter = createAuthRouter(authController);
export const organizationRouter = createOrganizationRouter(
  organizationController
);

// Middlewares
export const Authenticate = createAuthenticateMiddleware(sessionRepository);

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

// Repositories
const userRepository = new UserRepository();
const taskRepository = new TaskRepository();
const sessionRepository = new SessionRepository();

// Services
const userService = new UserService(userRepository);
const taskService = new TaskService(taskRepository);
const authService = new AuthService(userRepository, sessionRepository);

// Controllers
const userController = new UserController(userService);
const taskController = new TaskController(taskService);
const authController = new AuthController(authService);

// Routers
export const userRouter = createUserRouter(userController);
export const taskRouter = createTaskRouter(taskController);
export const authRouter = createAuthRouter(authController);

// Middlewares
export const Authenticate = createAuthenticateMiddleware(sessionRepository);

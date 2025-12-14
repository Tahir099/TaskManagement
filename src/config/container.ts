import { UserRepository } from "../repositories/implementations/user.repository";
import { TaskRepository } from "../repositories/implementations/task.repository";
import { SessionRepository } from "../repositories/implementations/session.repository";
import { UserService } from "../services/implementations/user.service";
import { TaskService } from "../services/implementations/task.service";
import { AuthService } from "../services/implementations/auth.service";
import { UserController } from "../controllers/user.controller";
import { TaskController } from "../controllers/task.controller";
import { AuthController } from "../controllers/auth.controller";
import { createUserRouter } from "../routers/user.route";
import { createTaskRouter } from "../routers/task.route";
import { createAuthRouter } from "../routers/auth.route";
import { createAuthenticateMiddleware } from "../middlewares/authorize";
import { OrganizationRepository } from "../repositories/implementations/organization.repository";
import { OrganizationService } from "../services/implementations/organization.service";
import { OrganizationController } from "../controllers/organization.controller";
import { createOrganizationRouter } from "../routers/organization.route";
import { OrganizationMemberRepository } from "../repositories/implementations/organization-member.repository";
import { BoardRepository } from "../repositories/implementations/board.repository";
import { BoardService } from "../services/implementations/Board.service";
import { BoardController } from "../controllers/board.controller";
import { createBoardRouter } from "../routers/board.route";
import { MemberShipService } from "../services/implementations/membership.service";
import { OrganizationGuard } from "../guards/organization.guard";
import { BoardGuard } from "../guards/board.guard";
import { TaskGuard } from "../guards/task.guard";

// Repositories
const userRepository = new UserRepository();
const taskRepository = new TaskRepository();
const sessionRepository = new SessionRepository();
const organizationRepository = new OrganizationRepository();
const organizationMemberRepository = new OrganizationMemberRepository();
const boardRepository = new BoardRepository();

// Services
const userService = new UserService(userRepository);
const taskService = new TaskService(taskRepository);
const authService = new AuthService(userRepository, sessionRepository);
const organizationService = new OrganizationService(
  organizationRepository,
  organizationMemberRepository,
  userRepository
);
const boardService = new BoardService(boardRepository);
const membershipService = new MemberShipService(organizationMemberRepository);

// Controllers
const userController = new UserController(userService);
const taskController = new TaskController(taskService);
const authController = new AuthController(authService);
const organizationController = new OrganizationController(organizationService);
const boardController = new BoardController(boardService);

// Guards
export const orgGuard = new OrganizationGuard(membershipService);
export const boardGuard = new BoardGuard(boardService, membershipService);
export const taskGuard = new TaskGuard(taskService, membershipService);

// Middlewares
export const Authenticate = createAuthenticateMiddleware(sessionRepository);

// Routers
export const userRouter = createUserRouter(userController);
export const taskRouter = createTaskRouter(taskController, boardGuard, taskGuard);
export const authRouter = createAuthRouter(authController);
export const organizationRouter = createOrganizationRouter(
  organizationController,
  orgGuard
);
export const boardRouter = createBoardRouter(boardController, orgGuard);

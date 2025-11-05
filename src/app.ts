import "reflect-metadata";
import "./repositories/implementations/user.repository";
import "./services/user.service";
import "./controllers/user.controller";
import "./repositories/implementations/task.repository";
import "./services/task.service";
import "./controllers/task.controller";
import "./services/auth.service";
import "./controllers/auth.controller";
import app from "./server";
import dotenv from "dotenv";
dotenv.config();
import "./config/container";
import UserRouter from "./routers/user.route";
import TaskRouter from "./routers/task.route";
import AuthRouter from "./routers/auth.route";
import { errorHandler } from "./errors/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import helmet from "helmet";
import cors from "cors";
import { requestId } from "./middlewares/request-id";
import { httpLogger } from "./middlewares/logger";
import { Authenticate } from "./middlewares/authorize";

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(requestId());
app.use(httpLogger);

app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/tasks", Authenticate, TaskRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

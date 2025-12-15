import "reflect-metadata";
import app from "./server";
import dotenv from "dotenv";
import {
  authRouter,
  userRouter,
  taskRouter,
  commentRouter,
  Authenticate,
  organizationRouter,
  boardRouter,
} from "./config/container";
import { errorHandler } from "./errors/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import helmet from "helmet";
import cors from "cors";
import { requestId } from "./middlewares/request-id";
import { httpLogger } from "./middlewares/logger";
import cookieParser from "cookie-parser";

dotenv.config();
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(requestId());
app.use(httpLogger);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tasks", Authenticate, taskRouter);
app.use("/comments", Authenticate, commentRouter);
app.use("/organizations", Authenticate, organizationRouter);
app.use("/boards", Authenticate, boardRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

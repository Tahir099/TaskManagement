import "reflect-metadata";
import app from "./server";
import dotenv from "dotenv";
import { authRouter, userRouter, taskRouter, Authenticate } from "./config/container";
import { errorHandler } from "./errors/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import helmet from "helmet";
import cors from "cors";
import { requestId } from "./middlewares/request-id";
import { httpLogger } from "./middlewares/logger";

dotenv.config();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(requestId());
app.use(httpLogger);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tasks", Authenticate, taskRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

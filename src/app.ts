import "reflect-metadata";
import "./repositories/implementations/user.repository";
import "./services/user.service";
import "./controllers/user.controller";
import "./repositories/implementations/task.repository";
import "./services/task.service";
import "./controllers/task.controller";
import app from "./server";
import dotenv from "dotenv";
import "./config/container";
import UserRouter from "./routers/user.route";
import TaskRouter from "./routers/task.route";

dotenv.config();

app.use("/users", UserRouter);
app.use("/task", TaskRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

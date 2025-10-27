import "reflect-metadata";
import "./repositories/implementations/user.repository";
import "./services/user.service";
import "./controllers/user.controller";
import app from "./server";
import dotenv from "dotenv";
import "./config/container"
import UserRouter from "./routers/user.route";


dotenv.config();

app.use("/users", UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

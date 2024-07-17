import { Router } from "express";
import { usersRouter } from "./users.router";
import { feedbackRouter } from "./feedback.router";

const routers = Router();

routers.use("/users", usersRouter);
routers.use("/feedback", feedbackRouter);

export default routers;

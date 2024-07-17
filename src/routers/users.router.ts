import { Router } from "express";
import {
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers";
import { authenticateToken } from "../middlewares";

export const usersRouter = Router();

// register & create new user
usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.use(authenticateToken);
// get user by id
usersRouter.get("/:id", getUser);

// update user by id
usersRouter.put("/:id", updateUser);

// delete user by id
usersRouter.delete("/:id", deleteUser);

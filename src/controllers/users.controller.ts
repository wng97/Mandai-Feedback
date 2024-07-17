import { Request, Response } from "express";
import {
  createUser,
  deleteUserData,
  loginUser,
  retrieveUserData,
  updateUserData,
} from "../services";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  const registerSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string(),
  });
  const reqBody = registerSchema.parse(req.body);

  const result = await createUser(reqBody);
  res.status(200).json(result);
};

export const login = async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const reqBody = loginSchema.parse(req.body);
  const result = await loginUser(reqBody);
  res.status(200).json(result);
};

export const getUser = async (req: Request, res: Response) => {
  const getUserParamSchema = z.object({
    id: z.string().nonempty(),
  });
  const { id } = getUserParamSchema.parse(req.params);
  console.log("id", id);
  const result = await retrieveUserData(parseInt(id));
  res.status(200).json(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const updateUserParamSchema = z.object({
    id: z.string().nonempty(),
  });
  const { id } = updateUserParamSchema.parse(req.params);
  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
  });
  const reqBody = updateUserBodySchema.parse(req.body);
  const result = await updateUserData(parseInt(id), reqBody);
  res.status(200).json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const updateUserParamSchema = z.object({
    id: z.string().nonempty(),
  });
  const { id } = updateUserParamSchema.parse(req.params);
  await deleteUserData(parseInt(id));
  res.status(200).send("User deleted");
};

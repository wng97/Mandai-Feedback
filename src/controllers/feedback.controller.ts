import { Request, Response } from "express";
import {
  createFeedback,
  deleteFeedbackData,
  getFeedbackDataById,
  getFeedbackListData,
  updateFeedbackData,
} from "../services";
import { z } from "zod";

export const submitFeedback = async (req: Request, res: Response) => {
  const submitFeedbackSchema = z.object({
    userId: z.string().nonempty(),
  });
  const { userId } = submitFeedbackSchema.parse(req.params);
  const submitFeedbackBodySchema = z.object({
    feedback: z.string().nonempty(),
    rating: z.number().int().min(1).max(5),
  });
  const reqBody = submitFeedbackBodySchema.parse(req.body);

  const result = await createFeedback(parseInt(userId), reqBody);

  res.status(200).json(result);
};

export const getFeedbackList = async (req: Request, res: Response) => {
  const result = await getFeedbackListData();
  res.status(200).json(result);
};

export const getFeedbackById = async (req: Request, res: Response) => {
  const getFeedbackByIdSchema = z.object({
    id: z.string().nonempty(),
  });
  const { id } = getFeedbackByIdSchema.parse(req.params);
  const result = await getFeedbackDataById(parseInt(id));
  res.status(200).json(result);
};

export const updateFeedback = async (req: Request, res: Response) => {
  const updateFeedbackParamSchema = z.object({
    id: z.string().nonempty(),
  });
  const { id } = updateFeedbackParamSchema.parse(req.params);
  const updateFeedbackBodySchema = z.object({
    feedback: z.string().nonempty().optional(),
    rating: z.number().int().min(1).max(5).optional(),
  });
  const reqBody = updateFeedbackBodySchema.parse(req.body);

  const result = await updateFeedbackData(parseInt(id), reqBody);

  res.status(200).json(result);
};

export const deleteFeedback = async (req: Request, res: Response) => {
  const deleteFeedbackParamSchema = z.object({
    id: z.string().nonempty(),
  });
  const { id } = deleteFeedbackParamSchema.parse(req.params);
  await deleteFeedbackData(parseInt(id));
  res.status(200).json("User deleted");
};

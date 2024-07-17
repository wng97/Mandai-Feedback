import { Router } from "express";
import {
  deleteFeedback,
  getFeedbackById,
  getFeedbackList,
  submitFeedback,
  updateFeedback,
} from "../controllers";
import { authenticateToken } from "../middlewares";

export const feedbackRouter = Router();

feedbackRouter.use(authenticateToken);

// register & create new user
feedbackRouter.post("/:userId/submit", submitFeedback);

// get all the feedback
feedbackRouter.get("/list", getFeedbackList);

// get feedback by id
feedbackRouter.get("/:id", getFeedbackById);

// update feedback by id
feedbackRouter.put("/:id", updateFeedback);

// delete feedback by id
feedbackRouter.delete("/:id", deleteFeedback);

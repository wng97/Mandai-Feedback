import { describe, expect, it, vi } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";
import * as feedbackService from "../../services";
import {
  deleteFeedback,
  getFeedbackById,
  getFeedbackList,
  submitFeedback,
  updateFeedback,
} from "../feedback.controller";

describe("feedback controller", () => {
  const res = createResponse();
  describe("submitFeedback", () => {
    it("submit feedback as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          userId: "11",
        },
        body: {
          feedback: "very funnnnn!",
          rating: 5,
        },
      });
      const createFeedbackMock = vi
        .spyOn(feedbackService, "createFeedback")
        .mockResolvedValue({
          id: 3,
          feedback: "very funnnnn!",
          rating: 5,
          user_id: 11,
          created_at: "2024-07-16T10:45:21.792Z",
        });

      await submitFeedback(fakeRequest, res);

      expect(createFeedbackMock).toHaveBeenCalledOnce;
      expect(createFeedbackMock).toHaveBeenCalledWith(11, {
        feedback: "very funnnnn!",
        rating: 5,
      });
      createFeedbackMock.mockRestore();
    });
  });

  describe("getFeedbackList", () => {
    it("get feedback list as expected", async () => {
      const fakeRequest = createRequest();
      const getFeedbackListDataMock = vi
        .spyOn(feedbackService, "getFeedbackListData")
        .mockResolvedValue([
          {
            id: 2,
            feedback: "overall very good experience",
            rating: 5,
            user_id: 3,
            created_at: "2024-07-15T18:03:07.442Z",
            name: "Will",
            email: "wng8797@gmail.com",
          },
          {
            id: 3,
            feedback: "very funnnnn!",
            rating: 5,
            user_id: 11,
            created_at: "2024-07-16T10:45:21.792Z",
            name: "rayyyy",
            email: "ray@gmail.com",
          },
        ]);
      await getFeedbackList(fakeRequest, res);
      expect(getFeedbackListDataMock).toHaveBeenCalledOnce;
      getFeedbackListDataMock.mockRestore();
    });
  });

  describe("getFeedbackById", () => {
    it("get feedback by id as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          id: "3",
        },
      });
      const getFeedbackDataByIdMock = vi
        .spyOn(feedbackService, "getFeedbackDataById")
        .mockResolvedValue({
          id: 3,
          feedback: "very funnnnn!",
          rating: 5,
          user_id: 11,
          created_at: "2024-07-16T10:45:21.792Z",
          name: "rayyyy",
          email: "",
        });
      await getFeedbackById(fakeRequest, res);

      expect(getFeedbackDataByIdMock).toHaveBeenCalledOnce;
      expect(getFeedbackDataByIdMock).toHaveBeenCalledWith(3);
      getFeedbackDataByIdMock.mockRestore();
    });
  });
  describe("updateFeedback", () => {
    it("update feedback as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          id: "3",
        },
        body: {
          feedback: "very funnnnn and nice experience!",
        },
      });
      const updateFeedbackDataMock = vi
        .spyOn(feedbackService, "updateFeedbackData")
        .mockResolvedValue({
          id: 3,
          feedback: "very funnnnn and nice experience!",
          rating: 5,
          user_id: 11,
          created_at: "2024-07-16T10:45:21.792Z",
        });
      await updateFeedback(fakeRequest, res);
      expect(updateFeedbackDataMock).toHaveBeenCalledOnce;
      expect(updateFeedbackDataMock).toHaveBeenCalledWith(3, {
        feedback: "very funnnnn and nice experience!",
      });
      updateFeedbackDataMock.mockRestore();
    });
  });

  describe("deleteFeedback", () => {
    it("delete feedback as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          id: "3",
        },
      });
      const deleteFeedbackDataMock = vi
        .spyOn(feedbackService, "deleteFeedbackData")
        .mockResolvedValue();
      await deleteFeedback(fakeRequest, res);
      expect(deleteFeedbackDataMock).toHaveBeenCalledOnce;
      expect(deleteFeedbackDataMock).toHaveBeenCalledWith(3);
      deleteFeedbackDataMock.mockRestore();
    });
  });
});

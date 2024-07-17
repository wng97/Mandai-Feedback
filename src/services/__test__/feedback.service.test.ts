import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { Pool } from "pg";
import { CreateFeedbackPayload } from "../../interfaces";
import {
  createFeedback,
  deleteFeedbackData,
  getFeedbackDataById,
  getFeedbackListData,
  updateFeedbackData,
} from "../feedback.service";
import { get } from "http";

vi.mock("pg", async (importOriginal) => {
  const actual: any = await importOriginal();
  const Pool = vi.fn();
  Pool.prototype.query = vi.fn();
  const { types } = actual;
  return { ...actual, Pool, types };
});

describe("feedback service", () => {
  process.env.ACCESS_TOKEN_SECRET =
    "a53b8b503c7e353281b5ca29272451cb6c3de81daab6a86d319cadeb0e646450d86b35c0466cb2b1f7b90ccd51a8b45849b0f461dc5ce7552d90dcd03e2c8e3a";
  let pool: any;
  beforeEach(() => {
    pool = new Pool();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createFeedback", () => {
    it("should create feedback as expected", async () => {
      const mockCreateFeedbackPayload: CreateFeedbackPayload = {
        feedback: "Test feedback",
        rating: 5,
      };
      pool.query.mockResolvedValue({
        rows: [
          {
            ...mockCreateFeedbackPayload,
            id: 1,
            user_id: 25,
            created_at: new Date(),
          },
        ],
        rowCount: 1,
      });
      const result = await createFeedback(25, mockCreateFeedbackPayload);

      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual({
        ...mockCreateFeedbackPayload,
        id: 1,
        user_id: 25,
        created_at: expect.any(Date),
      });
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      const mockCreateFeedbackPayload: CreateFeedbackPayload = {
        feedback: "Test feedback",
        rating: 5,
      };
      await expect(
        createFeedback(25, mockCreateFeedbackPayload)
      ).rejects.toThrow("Somethings went wrong");
    });
  });

  describe("getFeedbackListData", () => {
    it("should get feedback list data as expected", async () => {
      const mockFeedbackListData = [
        {
          id: 1,
          user_id: 25,
          feedback: "Test feedback",
          rating: 5,
          created_at: new Date(),
          name: "Test User",
          email: "",
        },
      ];
      pool.query.mockResolvedValue({
        rows: mockFeedbackListData,
        rowCount: 1,
      });

      const result = await getFeedbackListData();

      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual(mockFeedbackListData);
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      await expect(getFeedbackListData()).rejects.toThrow(
        "Somethings went wrong"
      );
    });
  });

  describe("getFeedbackDataById", () => {
    it("should get feedback data by id as expected", async () => {
      const mockFeedbackData = {
        id: 1,
        user_id: 25,
        feedback: "Test feedback",
        rating: 5,
        created_at: new Date(),
        name: "Test User",
        email: "",
      };
      pool.query.mockResolvedValue({
        rows: [mockFeedbackData],
        rowCount: 1,
      });
      const result = await getFeedbackDataById(1);
      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual(mockFeedbackData);
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      await expect(getFeedbackDataById(1)).rejects.toThrow(
        "Somethings went wrong"
      );
    });
  });

  describe("updateFeedbackData", () => {
    it("should update feedback data as expected", async () => {
      const mockUpdateFeedbackPayload = {
        feedback: "Test feedback",
        rating: 5,
      };
      pool.query.mockResolvedValue({
        rows: [
          {
            ...mockUpdateFeedbackPayload,
            id: 1,
            user_id: 25,
            created_at: new Date(),
          },
        ],
        rowCount: 1,
      });
      const result = await updateFeedbackData(1, mockUpdateFeedbackPayload);
      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual({
        ...mockUpdateFeedbackPayload,
        id: 1,
        user_id: 25,
        created_at: expect.any(Date),
      });
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      const mockUpdateFeedbackPayload = {
        feedback: "Test feedback",
        rating: 5,
      };
      await expect(
        updateFeedbackData(1, mockUpdateFeedbackPayload)
      ).rejects.toThrow("Somethings went wrong");
    });
  });

  describe("deleteFeedbackData", () => {
    it("should delete feedback data as expected", async () => {
      pool.query.mockResolvedValue();
      await deleteFeedbackData(1);
      expect(pool.query).toHaveBeenCalledOnce;
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      await expect(deleteFeedbackData(1)).rejects.toThrow(
        "Somethings went wrong"
      );
    });
  });
});

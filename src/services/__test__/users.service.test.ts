import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import {
  CreateUserData,
  LoginUserData,
  UpdateUserPayload,
} from "../../interfaces";
import {
  createUser,
  deleteUserData,
  loginUser,
  retrieveUserData,
  updateUserData,
} from "../users.service";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

vi.mock("pg", async (importOriginal) => {
  const actual: any = await importOriginal();
  const Pool = vi.fn();
  Pool.prototype.query = vi.fn();
  const { types } = actual;
  return { ...actual, Pool, types };
});

describe("users service", () => {
  process.env.ACCESS_TOKEN_SECRET =
    "a53b8b503c7e353281b5ca29272451cb6c3de81daab6a86d319cadeb0e646450d86b35c0466cb2b1f7b90ccd51a8b45849b0f461dc5ce7552d90dcd03e2c8e3a";
  let pool: any;
  beforeEach(() => {
    pool = new Pool();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("createUser", () => {
    it("should create user as expected", async () => {
      const mockQueryResult = {
        id: "25",
        name: "Test User",
        email: "test@example.com",
        password:
          "$2b$10$ewZp/dGY1QJ0M6V6Tqw1/.xOAGfes3uxFDjcZie0GMebQt5Q8ANOm",
      };
      pool.query.mockResolvedValue({
        rows: [mockQueryResult],
        rowCount: 1,
      });
      const mockUserData: CreateUserData = {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
      };
      const result = await createUser(mockUserData);
      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual(mockQueryResult);
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      const mockUserData: CreateUserData = {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
      };
      // const result = await createUser(mockUserData);

      expect(createUser(mockUserData)).rejects.toThrowError(
        "Somethings went wrong"
      );
    });
  });

  describe("loginUser", () => {
    it("should login user as expected", async () => {
      const mockQueryResult = {
        id: "25",
        name: "Test User",
        email: "test@example.com",
        password:
          "$2b$10$Z8X6HK7W8JAjjrGgdYOMZu8yBCfzIiEYf7AxgpzbWV3KwjudmVtQq",
      };
      pool.query.mockResolvedValue({
        rows: [mockQueryResult],
        rowCount: 1,
      });
      const mockLoginUserData: LoginUserData = {
        email: "test@example.com",
        password: "testpassword",
      };
      await loginUser(mockLoginUserData);
      expect(pool.query).toHaveBeenCalledOnce;
      expect(jwt.sign).toHaveBeenCalledOnce;
    });

    it("should throw error if user not found", async () => {
      pool.query.mockResolvedValue({
        rows: [],
        rowCount: 0,
      });
      const mockLoginUserData: LoginUserData = {
        email: "",
        password: "",
      };

      expect(loginUser(mockLoginUserData)).rejects.toThrowError(
        "Invalid Credentials"
      );
    });

    it("should throw error if password is invalid", async () => {
      const mockQueryResult = {
        id: "25",
        name: "Test User",
        email: "test@example.com",
        password:
          "$2b$10$Z8X6HK7W8JAjjrGgdYOMZu8yBCfzIiEYf7AxgpzbWV3KwjudmVtQq",
      };
      pool.query.mockResolvedValue({
        rows: [mockQueryResult],
        rowCount: 1,
      });
      const mockLoginUserData: LoginUserData = {
        email: "test@example.com",
        password: "vsvsv",
      };
      // await loginUser(mockLoginUserData);

      expect(loginUser(mockLoginUserData)).rejects.toThrowError(
        "Invalid Credentials"
      );
    });
  });

  describe("retrieveUserData", () => {
    it("should retrieve user data as expected", async () => {
      const mockQueryResult = {
        id: "25",
        name: "Test User",
        email: "test@example.com",
        password:
          "$2b$10$Z8X6HK7W8JAjjrGgdYOMZu8yBCfzIiEYf7AxgpzbWV3KwjudmVtQq",
      };
      pool.query.mockResolvedValue({
        rows: [mockQueryResult],
        rowCount: 1,
      });
      const result = await retrieveUserData(25);

      console.log("res: ", result);
      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual(mockQueryResult);
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));

      expect(retrieveUserData(25)).rejects.toThrowError(
        "Somethings went wrong"
      );
    });
  });

  describe("updateUserData", () => {
    it("should update user data as expected", async () => {
      const mockQueryResult = {
        id: "25",
        name: "Test User",
        email: "test@example.com",
        password:
          "$2b$10$Z8X6HK7W8JAjjrGgdYOMZu8yBCfzIiEYf7AxgpzbWV3KwjudmVtQq",
      };
      const mockUpdateUserPayload: UpdateUserPayload = {
        name: "Test1",
        email: "test1@example.com",
        password: "testpassword",
      };
      pool.query.mockResolvedValue({
        rows: [
          { ...mockQueryResult, name: "Test1", email: "test1@example.com" },
        ],
        rowCount: 1,
      });
      const result = await updateUserData(25, mockUpdateUserPayload);
      expect(pool.query).toHaveBeenCalledOnce;
      expect(result).toEqual({
        ...mockQueryResult,
        name: "Test1",
        email: "test1@example.com",
      });
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      const mockUpdateUserPayload: UpdateUserPayload = {
        name: "Test1",
        email: "test1@example.com",
        password: "testpassword",
      };
      expect(updateUserData(25, mockUpdateUserPayload)).rejects.toThrowError(
        "Somethings went wrong"
      );
    });
  });

  describe("deleteUserData", () => {
    it("should delete user data as expected", async () => {
      pool.query.mockResolvedValue();
      await deleteUserData(25);
      expect(pool.query).toHaveBeenCalledOnce;
    });

    it("should throw error if something went wrong", async () => {
      pool.query.mockRejectedValueOnce(new Error("Something went wrong"));
      expect(deleteUserData(25)).rejects.toThrowError("Somethings went wrong");
    });
  });
});

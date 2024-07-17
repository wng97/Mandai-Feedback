import { describe, expect, it, vi } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";
import {
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../users.controller";
import * as usersService from "../../services";

describe("users controller", () => {
  const res = createResponse();
  describe("register", () => {
    it("register user as expected", async () => {
      const fakeRequest = createRequest({
        body: {
          email: "ray@gmail.com",
          password: "abc123",
          name: "ray",
        },
      });

      const createUserMock = vi
        .spyOn(usersService, "createUser")
        .mockResolvedValue({
          id: "11",
          name: "ray",
          email: "ray@gmail.com",
          password:
            "$2b$10$HGKFNRh8pGRTbdzIh5uJcuaGP3jQ7AWmJiN9o/dpZ5WuwgHLIXYFK",
        });
      await register(fakeRequest, res);

      expect(createUserMock).toHaveBeenCalledOnce;
      expect(createUserMock).toHaveBeenCalledWith({
        email: "ray@gmail.com",
        password: "abc123",
        name: "ray",
      });
      createUserMock.mockRestore();
    });
  });

  describe("login", () => {
    it("login user as expected", async () => {
      const fakeRequest = createRequest({
        body: {
          email: "ray@gmail.com",
          password: "abc123",
        },
      });

      const loginUserMock = vi
        .spyOn(usersService, "loginUser")
        .mockResolvedValue({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExIiwiaWF0IjoxNzIxMTIxNTc3fQ.zqKzxO3R9_7x52nhW2BOPjAfLG04Qw2O2vnGXZHtGrA",
        });
      await login(fakeRequest, res);
      expect(loginUserMock).toHaveBeenCalledOnce;
      expect(loginUserMock).toHaveBeenCalledWith({
        email: "ray@gmail.com",
        password: "abc123",
      });
      loginUserMock.mockRestore();
    });
  });

  describe("getUser", () => {
    it("get user as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          id: "11",
        },
      });

      const retrieveUserDataMock = vi
        .spyOn(usersService, "retrieveUserData")
        .mockResolvedValue({
          id: "11",
          name: "ray",
          email: "ray@gmail.com",
          password:
            "$2b$10$HGKFNRh8pGRTbdzIh5uJcuaGP3jQ7AWmJiN9o/dpZ5WuwgHLIXYFK",
        });
      await getUser(fakeRequest, res);
      expect(retrieveUserDataMock).toHaveBeenCalledOnce;
      expect(retrieveUserDataMock).toHaveBeenCalledWith(11);
      retrieveUserDataMock.mockRestore();
    });
  });

  describe("updateUser", () => {
    it("update user as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          id: "11",
        },
        body: {
          name: "raymond",
        },
      });
      const updateUserDataMock = vi
        .spyOn(usersService, "updateUserData")
        .mockResolvedValue({
          id: "11",
          name: "raymond",
          email: "ray@gmail.com",
          password:
            "$2b$10$HGKFNRh8pGRTbdzIh5uJcuaGP3jQ7AWmJiN9o/dpZ5WuwgHLIXYFK",
        });
      await updateUser(fakeRequest, res);
      expect(updateUserDataMock).toHaveBeenCalledOnce;
      expect(updateUserDataMock).toHaveBeenCalledWith(11, {
        name: "raymond",
      });
      updateUserDataMock.mockRestore();
    });
  });

  describe("deleteUser", () => {
    it("delete user as expected", async () => {
      const fakeRequest = createRequest({
        params: {
          id: "11",
        },
      });
      const deleteUserDataMock = vi
        .spyOn(usersService, "deleteUserData")
        .mockResolvedValue();
      await deleteUser(fakeRequest, res);
      expect(deleteUserDataMock).toHaveBeenCalledOnce;
      expect(deleteUserDataMock).toHaveBeenCalledWith(11);
      deleteUserDataMock.mockRestore();
    });
  });
});

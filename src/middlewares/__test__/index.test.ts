import { describe, expect, it, vi } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";
import { authenticateToken } from "../index";

const env = Object.assign({}, process.env);

describe("middlewares", () => {
  const res = createResponse();
  describe("authenticateToken", () => {
    it("should return 401 with Unauthorised", () => {
      const fakeRequest = createRequest({
        headers: {},
      });
      res.status = vi.fn().mockReturnValue(res);
      res.send = vi.fn();
      const next = vi.fn();
      authenticateToken(fakeRequest, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith("Unauthorized");
      expect(next).not.toHaveBeenCalled();
    });
    it("should return 403 with  Authorization failed", () => {
      const fakeRequest = createRequest({
        headers: {
          authorization: "Bearer acbjsb",
        },
      });
      res.status = vi.fn().mockReturnValue(res);
      res.send = vi.fn();
      const next = vi.fn();
      authenticateToken(fakeRequest, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith("Authorization failed");
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with no error", async () => {
      process.env.ACCESS_TOKEN_SECRET =
        "a53b8b503c7e353281b5ca29272451cb6c3de81daab6a86d319cadeb0e646450d86b35c0466cb2b1f7b90ccd51a8b45849b0f461dc5ce7552d90dcd03e2c8e3a";
      const fakeRequest = createRequest({
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJpYXQiOjE3MjEwNjY1NjF9.RJJXWZCCZEQrtDzB_evD2BD93fsB29YEv2fJzZbd49g",
        },
      });
      res.status = vi.fn().mockReturnValue(res);
      res.send = vi.fn();
      const next = vi.fn();

      await authenticateToken(fakeRequest, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

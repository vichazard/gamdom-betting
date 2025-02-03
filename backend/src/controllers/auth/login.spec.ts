import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginHandler } from "./login";
import { authService } from "../../services";
import { comparePassword } from "../../utils/auth";

jest.mock("../../services");
jest.mock("../../utils/auth");
jest.mock("jsonwebtoken");

describe("loginHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return 401 if user is not found", async () => {
    (authService.getUserByEmail as jest.Mock).mockResolvedValue(null);

    await loginHandler(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });

  it("should return 401 if password does not match", async () => {
    (authService.getUserByEmail as jest.Mock).mockResolvedValue({
      password: "hashedPassword",
    });
    (comparePassword as jest.Mock).mockReturnValue(false);

    await loginHandler(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });

  it("should return 200 and a token if login is successful", async () => {
    const user = {
      id: 1,
      email: "test@example.com",
      password: "hashedPassword",
    };
    (authService.getUserByEmail as jest.Mock).mockResolvedValue(user);
    (comparePassword as jest.Mock).mockReturnValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fakeToken");

    await loginHandler(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Login successful",
      token: "fakeToken",
    });
  });
});

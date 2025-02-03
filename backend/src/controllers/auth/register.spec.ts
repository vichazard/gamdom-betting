import { Request, Response } from "express";
import { registerHandler } from "./register";
import { authService } from "../../services";
import { encryptPassword } from "../../utils/auth";

jest.mock("../../services");
jest.mock("../../utils/auth");

describe("registerHandler", () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if user already exists", async () => {
    (authService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
    });

    await registerHandler(req as Request, res as Response);

    expect(authService.getUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User already exists" });
  });

  it("should create a new user and return 201", async () => {
    (authService.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (encryptPassword as jest.Mock).mockReturnValue("encryptedPassword");
    (authService.register as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
    });

    await registerHandler(req as Request, res as Response);

    expect(authService.getUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(encryptPassword).toHaveBeenCalledWith("password123");
    expect(authService.register).toHaveBeenCalledWith(
      "test@example.com",
      "encryptedPassword"
    );
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User created successfully",
    });
  });
});

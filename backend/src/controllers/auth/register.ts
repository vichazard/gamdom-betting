import { Request, Response } from "express";
import { authService } from "services";
import { encryptPassword } from "utils/auth";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};
type ReqQuery = unknown;

export const registerHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await authService.getUserByEmail(email);
  if (user) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  await authService.register(email, encryptPassword(password));
  res.status(201).json({ message: "User created successfully" });
};

export const register = errorHandlerWrapper(registerHandler);

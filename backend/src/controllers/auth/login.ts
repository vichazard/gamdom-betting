import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authService } from "services";
import { comparePassword } from "utils/auth";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};
type ReqQuery = unknown;

export const loginHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await authService.getUserByEmail(email);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  if (!comparePassword(password, user.password)) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", token });
};

export const login = errorHandlerWrapper(loginHandler);

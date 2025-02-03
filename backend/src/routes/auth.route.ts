import express from "express";

import { authController } from "controllers";
import { authValidator } from "validators";

const authRouter = express.Router();

// Auth Route
authRouter.post("/login", authValidator.loginValidator(), authController.login);
authRouter.post(
  "/register",
  authValidator.registerValidator(),
  authController.register
);

export default authRouter;

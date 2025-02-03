import express from "express";

import { betController } from "controllers";
import { authMiddleware } from "middlewares/auth.middleware";
import { betValidator } from "validators";

const betRouter = express.Router();

// Auth Route
betRouter.post(
  "/",
  authMiddleware,
  betValidator.createBetValidator(),
  betController.createBet
);

export default betRouter;

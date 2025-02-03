import express from "express";

import authRouter from "./auth.route";
import betRouter from "./bet.route";
import eventRouter from "./event.route";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);
appRoutes.use("/events", eventRouter);
appRoutes.use("/bets", betRouter);

export default appRoutes;

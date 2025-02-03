import express from "express";

import authRouter from "./auth.route";
import eventRouter from "./event.route";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);
appRoutes.use("/events", eventRouter);

export default appRoutes;

import express from "express";

import authRouter from "./auth.route";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);

export default appRoutes;

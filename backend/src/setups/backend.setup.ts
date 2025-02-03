import { json as bodyParserJSON } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import { ROUTE_VERSION } from "config";

import { errorHandlerMiddleware, requestLoggerMiddleware } from "middlewares";

import appRoutes from "routes";

const backendSetup = (app: Express) => {
  dotenv.config();

  const port = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json());
  app.use(bodyParserJSON());

  // Middleware
  app.use(requestLoggerMiddleware);

  // Health check
  app.use("/health", function (_req: Request, res: Response) {
    res.send("OK");
  });

  // Routes
  app.use(`/api/${ROUTE_VERSION}`, appRoutes);

  // Error handler
  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

export default backendSetup;

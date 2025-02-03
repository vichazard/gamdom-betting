import express from "express";

import { eventController } from "controllers";
import { authMiddleware } from "middlewares/auth.middleware";
import { eventValidator } from "validators";

const eventRouter = express.Router();

// Event Route
eventRouter.get("/", eventController.getAllEvents);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.post(
  "/",
  authMiddleware,
  eventValidator.createEventValidator(),
  eventController.createEvent
);
eventRouter.put(
  "/:id",
  authMiddleware,
  eventValidator.updateEventValidator(),
  eventController.updateEvent
);
eventRouter.delete(
  "/:id",
  authMiddleware,
  eventValidator.deleteEventValidator(),
  eventController.deleteEvent
);

export default eventRouter;

import { Request, Response } from "express";
import { eventService } from "services";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = {
  id: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const deleteEventHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const eventId = parseInt(req.params.id);
  const event = await eventService.getEventById(eventId);
  if (!event) {
    res.status(404).json("Event not found");
  }

  const result = await eventService.deleteEvent(eventId);
  res.json(result);
};

export const deleteEvent = errorHandlerWrapper(deleteEventHandler);

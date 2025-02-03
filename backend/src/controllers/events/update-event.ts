import { Request, Response } from "express";
import { eventService } from "services";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = {
  id: string;
};
type ResBody = unknown;
type ReqBody = {
  event_name?: string;
  odds?: number;
};
type ReqQuery = unknown;

export const updateEventHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const eventId = parseInt(req.params.id);
  const updates = req.body;

  const event = await eventService.getEventById(eventId);

  if (!event) {
    res.status(404).json("Event not found");
  }

  const result = await eventService.updateEvent(eventId, {
    ...event,
    ...updates,
  });
  res.status(200).json(result);
};

export const updateEvent = errorHandlerWrapper(updateEventHandler);

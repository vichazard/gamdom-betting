import { Request, Response } from "express";
import { eventService } from "services";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = {
  id: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getEventByIdHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const eventId = parseInt(req.params.id);
  const result = await eventService.getEventById(eventId);

  if (!result) {
    res.status(404).json("Event not found");
  }
  res.json(result);
};

export const getEventById = errorHandlerWrapper(getEventByIdHandler);

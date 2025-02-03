import { Request, Response } from "express";
import { eventService } from "services";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getAllEventsHandler = async (
  _req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const result = await eventService.getEvents();
  res.status(200).json(result);
};

export const getAllEvents = errorHandlerWrapper(getAllEventsHandler);

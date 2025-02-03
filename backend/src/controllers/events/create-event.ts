import { Request, Response } from "express";
import { eventService } from "services";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  event_name: string;
  odds: number[];
};
type ReqQuery = unknown;

export const createEventHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { event_name, odds } = req.body;
  const result = await eventService.createEvent({ event_name, odds });
  res.status(201).json(result);
};

export const createEvent = errorHandlerWrapper(createEventHandler);

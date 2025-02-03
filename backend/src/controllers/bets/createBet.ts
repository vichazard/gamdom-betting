import { BetResult } from "enums/bet";
import { Request, Response } from "express";
import { betService, eventService } from "services";
import { errorHandlerWrapper } from "utils/error-handler-wrapper";
import { getOddFromEvent } from "utils/event";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  eventId: number;
  result: BetResult;
  value: number;
};
type ReqQuery = unknown;

export const createBetHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { eventId, result: betResult, value } = req.body;
  const user = req["user"];
  const event = await eventService.getEventById(eventId);
  const odd = getOddFromEvent(event, betResult);
  const result = await betService.createBet({
    userId: user["user_id"],
    eventId,
    odd,
    result: betResult,
    value,
  });
  res.status(201).json(result);
};

export const createBet = errorHandlerWrapper(createBetHandler);

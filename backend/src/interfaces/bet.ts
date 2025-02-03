import { BetResult } from "enums/bet";

export interface CreateBetProps {
  userId: number;
  eventId: number;
  result: BetResult;
  odd: number;
  value: number;
}

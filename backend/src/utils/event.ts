import { BetResult } from "enums/bet";
import { SportEvent } from "interfaces";

export const getOddFromEvent = (event: SportEvent, betResult: BetResult) => {
  switch (betResult) {
    case BetResult.WIN:
      return event.odds[0];
    case BetResult.DRAW:
      return event.odds[1];
    case BetResult.LOSE:
      return event.odds[2];
    default:
      throw new Error("Invalid bet result");
  }
};

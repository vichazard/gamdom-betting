import { BetResult } from '@/enums/bet';

export const getBetResult = (odd: number) => {
  switch (odd) {
    case 0:
      return BetResult.WIN;
    case 1:
      return BetResult.DRAW;
    case 2:
      return BetResult.LOSE;
    default:
      return BetResult.DRAW;
  }
};

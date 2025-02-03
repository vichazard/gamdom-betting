import { BetResult } from "enums/bet";
import { body } from "express-validator";

export const createBetValidator = () => {
  return [
    body("eventId")
      .notEmpty()
      .withMessage({ title: "Event Id is required" })
      .bail()
      .isInt()
      .withMessage({ title: "The event id must be an integer." }),
    body("result")
      .notEmpty()
      .withMessage({ title: "Bet result is required" })
      .bail()
      .isIn(Object.values(BetResult))
      .withMessage({ title: "Bet result must be one of: win, draw, lose" }),
    body("value")
      .notEmpty()
      .withMessage({ title: "Value is required" })
      .bail()
      .isDecimal()
      .withMessage({ title: "Value must be a number" }),
  ];
};

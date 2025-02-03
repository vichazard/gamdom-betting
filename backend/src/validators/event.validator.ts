import { body, param } from "express-validator";

export const createEventValidator = () => {
  return [
    body("event_name").notEmpty().withMessage({ title: "Name is required" }),
    body("odds")
      .isArray()
      .withMessage({ title: "Odds must be an array" })
      .bail()
      .custom((odds: any[]) => {
        return odds.every(
          (odd) =>
            typeof odd === "number" &&
            Number.isFinite(odd) &&
            /^\d+(\.\d{1,2})?$/.test(odd.toString())
        );
      })
      .withMessage({
        title: "Each odd must be a number with up to 2 decimal places",
      }),
  ];
};

export const updateEventValidator = () => {
  return [
    param("id").isInt().withMessage({ title: "Invalid event ID" }),
    body("event_name")
      .optional()
      .notEmpty()
      .withMessage({ title: "Name cannot be empty if provided" }),
    body("odds")
      .optional()
      .isArray()
      .withMessage({ title: "Odds must be an array" })
      .bail()
      .custom((odds: any[]) => {
        return odds.every(
          (odd) =>
            typeof odd === "number" &&
            Number.isFinite(odd) &&
            /^\d+(\.\d{1,2})?$/.test(odd.toString())
        );
      })
      .withMessage({
        title: "Each odd must be a number with up to 2 decimal places",
      }),
  ];
};

export const deleteEventValidator = () => {
  return [param("id").isInt().withMessage({ title: "Invalid event ID" })];
};

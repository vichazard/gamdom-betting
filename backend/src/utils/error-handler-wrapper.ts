import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

import { ArgumentValidationError } from "errors";

export const errorHandlerWrapper = (
  func: (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ArgumentValidationError(
          "Invalid Arguments",
          errors.array().map((value: ValidationError) => value.msg)
        );
      }

      await func(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
};

import { body } from "express-validator";

export const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage({ title: "Email is required" })
      .bail()
      .isEmail()
      .withMessage({ title: "Invalid email" }),
    body("password")
      .notEmpty()
      .withMessage({ title: "Password is required" })
      .bail()
      .isLength({ min: 8 })
      .withMessage({ title: "Password must be at least 8 characters" }),
  ];
};

export const registerValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage({ title: "Email is required" })
      .bail()
      .isEmail()
      .withMessage({ title: "Invalid email" }),
    body("password")
      .notEmpty()
      .withMessage({ title: "Password is required" })
      .bail()
      .isLength({ min: 8 })
      .withMessage({ title: "Password must be at least 8 characters" }),
  ];
};

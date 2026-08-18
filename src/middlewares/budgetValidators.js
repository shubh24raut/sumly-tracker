import { body, param } from "express-validator";

export const createBudgetValidator = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  body("monthlyLimit")
    .notEmpty()
    .withMessage("Monthly limit is required")
    .isFloat({ gt: 0 })
    .withMessage("Monthly limit must be greater than 0"),
];

export const updateBudgetValidator = [
  body().custom((value) => {
    const allowedFields = ["category", "monthlyLimit"];
    const hasValidUpdateField = allowedFields.some(
      (field) => value[field] !== undefined
    );

    if (!hasValidUpdateField) {
      throw new Error("At least one field is required for update");
    }

    return true;
  }),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  body("monthlyLimit")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Monthly limit must be greater than 0"),
];

export const budgetIdValidator = [
  param("id").isMongoId().withMessage("Invalid budget id"),
];

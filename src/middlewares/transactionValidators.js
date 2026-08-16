import { body, param, query } from "express-validator";

export const createTransactionValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),

  body("type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be either income or expense"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  body("merchant")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Merchant cannot exceed 100 characters"),

  body("date").optional().isDate().withMessage("Date must be a valid date"),
];

export const updateTransactionValidator = [
  body().custom((value) => {
    const allowedFields = ["amount", "type", "category", "merchant", "date"];
    const hasValidUpdateField = allowedFields.some(
      (field) => value[field] !== undefined
    );

    if (!hasValidUpdateField) {
      throw new Error("At least one field is required for update");
    }

    return true;
  }),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be either income or expense"),

  body("category")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),

  body("merchant")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Merchant cannot exceed 100 characters"),

  body("date").optional().isDate().withMessage("Date must be a valid date"),
];

export const transactionIdValidator = [
  param("id").isMongoId().withMessage("Invalid transaction id"),
];

export const getTransactionsValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be either income or expense"),

  query("category")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Category must be between 1 and 50 characters"),
];

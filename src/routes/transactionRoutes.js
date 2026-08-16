import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createTransactionValidator,
  getTransactionsValidator,
  transactionIdValidator,
  updateTransactionValidator,
} from "../middlewares/transactionValidators.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  createTransactionValidator,
  validateRequest,
  createTransaction,
);
router.get("/", getTransactionsValidator, validateRequest, getTransactions);
router.put(
  "/:id",
  transactionIdValidator,
  updateTransactionValidator,
  validateRequest,
  updateTransaction,
);
router.delete(
  "/:id",
  transactionIdValidator,
  validateRequest,
  deleteTransaction,
);

export default router;

import express from "express";
import {
  createBudget,
  deleteBudget,
  getBudgets,
  updateBudget,
} from "../../controllers/budgetController.js";
import {
  createBudgetValidator,
  budgetIdValidator,
  updateBudgetValidator,
} from "../../middlewares/budgetValidators.js";
import validateRequest from "../../middlewares/validateRequest.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBudgetValidator, validateRequest, createBudget);
router.get("/", getBudgets);
router.put(
  "/:id",
  budgetIdValidator,
  updateBudgetValidator,
  validateRequest,
  updateBudget,
);
router.delete("/:id", budgetIdValidator, validateRequest, deleteBudget);

export default router;

import express from "express";
import {
  getBudgetProgress,
  getCategoryBreakdown,
  getMonthlySummary,
} from "../../controllers/analyticsController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { monthYearValidator } from "../../middlewares/analyticsValidators.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/monthly-summary",
  monthYearValidator,
  validateRequest,
  getMonthlySummary
);
router.get(
  "/category-breakdown",
  monthYearValidator,
  validateRequest,
  getCategoryBreakdown
);
router.get(
  "/budget-progress",
  monthYearValidator,
  validateRequest,
  getBudgetProgress
);

export default router;

import express from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../../controllers/authController.js";
import {
  loginValidator,
  registerValidator,
} from "../../middlewares/authValidators.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;

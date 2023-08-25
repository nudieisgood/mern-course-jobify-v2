import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import rateLimiter from "express-rate-limit";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/update-user").patch(authMiddleware, updateUser);
router.route("/get-currentUser").get(authMiddleware, getCurrentUser);
router.get("/logout", logout);

export default router;

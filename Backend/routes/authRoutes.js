import express from "express";
import {
  createUserFromClerk,
  getUserProfile,
} from "../controllers/authController.js";
import { clerkAuth } from "../middlewares/clerkMiddleware.js";

const router = express.Router();

// Webhook endpoint for Clerk user creation/updates
router.post("/clerk-webhook", createUserFromClerk);

// Get user profile (requires authentication)
router.get("/profile", clerkAuth, getUserProfile);

export default router;

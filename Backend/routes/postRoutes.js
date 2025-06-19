import express from "express";
import {
  getPosts,
  createPost,
  likePost,
} from "../controllers/postController.js";
import { clerkAuth } from "../middlewares/clerkMiddleware.js";

const router = express.Router();

router.post("/createPost", clerkAuth, createPost);
router.get("/getPost", getPosts);
router.get("/like/:id", clerkAuth, likePost);
export default router;

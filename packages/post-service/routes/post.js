import express from "express";
import {
  createPost,
  getFeed,
  getPostsBySpace,
  likePost
} from "../controllers/post.js";
import { auth } from "middlewares";

const router = express.Router();

router.get("/space/:spaceId", getPostsBySpace);
router.get("/feed", auth, getFeed);
router.post("/", auth, createPost);
router.patch("/:id/likePost", auth, likePost);

export default router;

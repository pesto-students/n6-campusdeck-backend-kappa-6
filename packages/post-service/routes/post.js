import express from "express";
import {
  createPost,
  getFeed,
  getPostsBySpace,
  getPostsByCampus,
  likePost,
  searchPosts
} from "../controllers/post.js";
import { auth } from "middlewares";

const router = express.Router();

router.get("/space/:spaceId", getPostsBySpace);
router.get("/campus/:campusId", getPostsByCampus);
router.get("/feed", auth, getFeed);
router.post("/", auth, createPost);
router.patch("/:id/likePost", auth, likePost);
router.get("/search", searchPosts);

export default router;

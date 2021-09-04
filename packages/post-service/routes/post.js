import express from "express";
import { createPost, getFeed, getPostsBySpace } from "../controllers/post.js";
import { auth } from "middlewares";

const router = express.Router();

router.get("/space/:spaceId", getPostsBySpace);
router.get("/feed", auth, getFeed);
router.post("/", auth, createPost);

export default router;

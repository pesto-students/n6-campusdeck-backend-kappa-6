import express from "express";
import { createPost } from "../controllers/post.js";
import { auth } from "user-service";

const router = express.Router();

router.post("/", auth, createPost);

export default router;

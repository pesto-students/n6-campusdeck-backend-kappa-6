import express from "express";
import { createComment } from "../controllers/comment.js";
import { auth } from "middlewares";

const router = express.Router();

router.post("/:parentId", createComment);

export default router;

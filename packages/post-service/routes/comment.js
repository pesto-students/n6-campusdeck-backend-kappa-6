import express from "express";
import { createComment, getCommentById } from "../controllers/comment.js";
import { auth } from "middlewares";

const router = express.Router();

router.get("/:id", getCommentById);
router.post("/:parentId", createComment);

export default router;

import express from "express";
import { auth } from "middlewares";
import {
  signUp,
  signIn,
  getUserById,
  getUserSpaces,
  addPreference,
  savePost,
  followUser
} from "../controllers/users.js";

const router = express.Router();

router.get("/space/:id", getUserSpaces);
router.get("/:id", getUserById);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/:id/addPreference", addPreference);
router.patch("/:userId/savePost/:postId", savePost);
router.patch("/:id/follow", auth, followUser);

export default router;

import express from "express";
import { auth } from "middlewares";
import {
  signUp,
  signIn,
  getUserById,
  getUserSpaces,
  addPreference,
  savePost,
  followUser,
  updateProfileImg,
  editUser
} from "../controllers/users.js";

const router = express.Router();

router.get("/space/:id", getUserSpaces);
router.get("/:id", getUserById);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/:id/addPreference", addPreference);
router.patch("/:userId/savePost/:postId", savePost);
router.patch("/:id/follow", auth, followUser);
router.patch("/updateProfileImg", auth, updateProfileImg);
router.put("/:id", editUser);

export default router;

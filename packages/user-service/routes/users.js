import express from "express";
import {
  signUp,
  signIn,
  getUserById,
  getUserSpaces
} from "../controllers/users.js";

const router = express.Router();

router.get("/space/:id", getUserSpaces);
router.get("/:id", getUserById);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;

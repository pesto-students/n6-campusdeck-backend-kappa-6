import express from "express";
import { signUp, signIn, getUserById } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUserById);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;

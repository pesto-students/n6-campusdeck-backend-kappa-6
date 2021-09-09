import express from "express";
import {
  signUp,
  signIn,
  getUserById,
  getUserSpaces,
  addPreference
} from "../controllers/users.js";

const router = express.Router();

router.get("/space/:id", getUserSpaces);
router.get("/:id", getUserById);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/:id/addPreference", addPreference);

export default router;

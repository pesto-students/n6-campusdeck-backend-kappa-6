import express from "express";
import {
  signUp,
  signIn,
  getStudentsInCampus,
  sendInvites
} from "../controllers/admin.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/getStudents/:campus", getStudentsInCampus);
router.post("/sendInvites", sendInvites);

export default router;

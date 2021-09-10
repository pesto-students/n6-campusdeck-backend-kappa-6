import express from "express";
import { signUp, signIn, getStudentsInCampus } from "../controllers/admin.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/getStudents/:campus", getStudentsInCampus);

export default router;

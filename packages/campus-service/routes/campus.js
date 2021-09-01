import express from "express";
import { createCampus } from "../controllers/campus.js";

const router = express.Router();

router.post("/", createCampus);

export default router;

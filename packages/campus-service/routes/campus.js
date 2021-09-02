import express from "express";
import { createCampus, getAllCampus } from "../controllers/campus.js";

const router = express.Router();

router.get("/", getAllCampus);
router.post("/", createCampus);

export default router;

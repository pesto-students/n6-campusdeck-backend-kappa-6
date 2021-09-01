import express from "express";
import { createSpace } from "../controllers/space.js";

const router = express.Router();

router.post("/", createSpace);

export default router;

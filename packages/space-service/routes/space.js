import express from "express";
import { createSpace, getAllSpacesByCampus } from "../controllers/space.js";

const router = express.Router();

router.post("/", createSpace);
router.get("/:campusId", getAllSpacesByCampus);

export default router;

import express from "express";
import {
  createSpace,
  getSpaceById,
  getAllSpacesByCampus,
  joinSpace,
  getTrendingSpaces
} from "../controllers/space.js";
import { auth } from "middlewares";

const router = express.Router();

router.post("/", auth, createSpace);
router.get("/campus/:campusId", getAllSpacesByCampus);
router.patch("/:id/join", auth, joinSpace);
router.get("/trending", getTrendingSpaces);
router.get("/:id", getSpaceById);

export default router;

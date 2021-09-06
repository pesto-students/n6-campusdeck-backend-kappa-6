import express from "express";
import {
  createSpace,
  getSpaceById,
  getAllSpacesByCampus,
  joinSpace
} from "../controllers/space.js";
import { auth } from "middlewares";

const router = express.Router();

router.post("/", auth, createSpace);
router.get("/campus/:campusId", getAllSpacesByCampus);
router.get("/:id", getSpaceById);
router.patch("/:id/join", auth, joinSpace);

export default router;

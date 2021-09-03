import express from "express";
import {
  createSpace,
  getSpaceById,
  getAllSpacesByCampus
} from "../controllers/space.js";
import { auth } from "middlewares";

const router = express.Router();

router.post("/", auth, createSpace);
router.get("/campus/:campusId", getAllSpacesByCampus);
router.get("/:id", getSpaceById);

export default router;

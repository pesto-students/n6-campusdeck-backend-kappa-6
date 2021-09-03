import express from "express";
import {
  createSpace,
  getSpaceById,
  getAllSpacesByCampus
} from "../controllers/space.js";
import { auth } from "middlewares";

const router = express.Router();

router.post("/", auth, createSpace);
router.get("/:id", getSpaceById);
router.get("/campus/:campusId", getAllSpacesByCampus);

export default router;

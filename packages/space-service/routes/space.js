import express from "express";
import {
  createSpace,
  getSpaceById,
  getAllSpacesByCampus
} from "../controllers/space.js";

const router = express.Router();

router.post("/", createSpace);
router.get("/:id", getSpaceById);
router.get("/campus/:campusId", getAllSpacesByCampus);

export default router;

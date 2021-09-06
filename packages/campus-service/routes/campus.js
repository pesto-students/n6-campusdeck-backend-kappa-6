import express from "express";
import {
  createCampus,
  getAllCampus,
  getCampusById,
  getCampusByName,
  getPopularCampus
} from "../controllers/campus.js";

const router = express.Router();

router.get("/popular", getPopularCampus);
router.get("/", getAllCampus);
router.get("/:id", getCampusById);
router.get("/getByName/:name", getCampusByName);
router.post("/", createCampus);

export default router;

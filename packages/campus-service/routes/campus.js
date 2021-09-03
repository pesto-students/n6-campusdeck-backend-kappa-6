import express from "express";
import {
  createCampus,
  getAllCampus,
  getCampusByName
} from "../controllers/campus.js";

const router = express.Router();

router.get("/", getAllCampus);
router.get("/getByName/:name", getCampusByName);
router.post("/", createCampus);

export default router;

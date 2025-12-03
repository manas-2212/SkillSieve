import express from "express";
import { matchInternships } from "../controllers/match.controller.js";

const router = express.Router();

router.get("/", matchInternships);
router.post("/", matchInternships); 

export default router;

import express from "express";
import { saveSkills } from "../controllers/skills.controller.js";

const router = express.Router();

router.post("/save", saveSkills);

export default router;

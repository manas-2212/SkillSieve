import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  createInternship,
  listInternships,
  getInternship,
  updateInternship,
  updateInternshipSkills,
  deleteInternship,
  deleteAllInternships
} from "../controllers/internship.controller.js";

const router = express.Router();
const prisma = new PrismaClient();


// SEED S(AMPLE INTERNSHIPS)

router.get("/seed", async (req, res) => {
  try {
    const sampleInternships = [
      {
        title: "Frontend Developer Intern",
        company: "Google",
        skills: ["React", "JavaScript", "HTML", "CSS"],
        location: "Bangalore",
        stipend: "₹25,000 / month",
      },
      {
        title: "Backend Developer Intern",
        company: "Microsoft",
        skills: ["Node.js", "Express", "MongoDB"],
        location: "Hyderabad",
        stipend: "₹30,000 / month",
      },
      {
        title: "Full Stack Intern",
        company: "Swiggy",
        skills: ["React", "Node.js", "MongoDB"],
        location: "Remote",
        stipend: "₹20,000 / month",
      },
      {
        title: "Python Developer Intern",
        company: "TCS",
        skills: ["Python", "Flask", "APIs"],
        location: "Mumbai",
        stipend: "₹15,000 / month",
      },
      {
        title: "Data Analyst Intern",
        company: "KPMG",
        skills: ["Excel", "Python", "SQL", "PowerBI"],
        location: "Delhi",
        stipend: "₹18,000 / month",
      },
      {
        title: "Machine Learning Intern",
        company: "Nvidia",
        skills: ["Python", "TensorFlow", "Pandas"],
        location: "Remote",
        stipend: "₹40,000 / month",
      },
    ];

    await prisma.internship.createMany({
      data: sampleInternships,
    });

    res.json({
      success: true,
      message: "Internships seeded successfully!",
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// crud routes
router.post("/create", createInternship);
router.get("/list", listInternships);
router.get("/:id", getInternship);
router.put("/update/:id", updateInternship);
router.patch("/update-skills/:id", updateInternshipSkills);
router.delete("/delete/:id", deleteInternship);
router.delete("/delete-all", deleteAllInternships);


export default router;

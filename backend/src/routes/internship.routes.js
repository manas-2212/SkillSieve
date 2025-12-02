import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


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
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const internships = await prisma.internship.findMany();
    res.json({ success: true, internships });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;

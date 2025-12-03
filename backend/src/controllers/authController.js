import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();



// REGISTER USER

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashed,
        isAdmin: false     // admin manually set via DB
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      },
      token 
    });

  } catch (err) {
    console.error("registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};



//LOGIN USER 

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create token with admin flag
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      skills: user.skills,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    };

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });

  } catch (err) {
    console.error("loginUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Protected profile (UNCHANGED)

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId)
      return res.status(400).json({ message: "Invalid request" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true, isAdmin: true },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ user });

  } catch (err) {
    console.error("getUserProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

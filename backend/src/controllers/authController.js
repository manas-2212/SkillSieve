import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();


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
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true, createdAt: true },
    });


    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", user, token });
  } catch (err) {
    console.error("registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async(req, res)=>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    const userData={
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch(err){
    console.error("loginUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//protected stuff
export const getUserProfile = async (req,res)=>{
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({user});
  } catch (err) {
    console.error("getUserProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

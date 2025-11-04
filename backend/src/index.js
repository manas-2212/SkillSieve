import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


// CORS: allow local + production origin
const allowedOrigins = [
  "http://localhost:3000",
  // add your deployed frontend domain(s) here
  //my frontend-yet to deploy!!!!!!!!!!!,
];

// Routes
app.use("/api/auth", authRoutes);

// Test database connection route
app.get("/api/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "Database connected ✅", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed ❌" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import skillsRoutes from "./routes/skills.routes.js";
import internshipRoutes from "./routes/internship.routes.js";
import testRoutes from "./routes/test.routes.js";



dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use("/api/test", testRoutes);

app.use(
  cors({
    origin: [
      "https://skillsieve.vercel.app",   // deployed frontend
      "http://localhost:3000"           // local
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());



// const allowedOrigins = [
//   "http://localhost:3000",
//   // add your deployed frontend domain(s) here
//   //my frontend-yet to deploy!!!!!!!!!!!,
// ];


app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/internships", internshipRoutes);



// Test database connection route
app.get("/api/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "Database connected", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

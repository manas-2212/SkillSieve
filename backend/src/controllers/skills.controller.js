import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveSkills = async (req, res) => {
  try {
    const { userId, skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ success: false, message: "No skills provided" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { skills }
    });

    return res.json({ success: true, user: updatedUser });

  } catch (err) {
    console.error("🔥 SAVE SKILLS ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
  
};

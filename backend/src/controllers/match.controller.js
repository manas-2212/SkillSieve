import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const matchInternships = async (req, res)=>{
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.skills) {
      return res.status(404).json({
        success: false,
        message: "User not found or no skills saved",
      });
    }
    const userSkills = user.skills;

    const internships = await prisma.internship.findMany();

    const results = internships.map((internship) => {
      const requiredSkills = internship.skills;
      const matched = requiredSkills.filter((skill) =>
        userSkills.includes(skill)
      );

      const matchScore = Math.round(
        (matched.length / requiredSkills.length) * 100
      );

      return {
        ...internship,
        matchedSkills: matched,
        matchScore,
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);

    return res.json({ success: true, results });

  } catch (err) {
    console.error("MATCH ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

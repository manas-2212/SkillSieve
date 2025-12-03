import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const matchInternships = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;

    const page = Number(req.query.page) || 1;
    const limit = 6;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "matchScore";
    const order = req.query.order || "desc";

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

    const internships = await prisma.internship.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { company: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    let results = internships.map((intern) => {
      const requiredSkills = intern.skills;
      const matchedSkills = requiredSkills.filter((s) =>
        userSkills.includes(s)
      );
      const matchScore = Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
      );

      return {
        ...intern,
        matchedSkills,
        matchScore,
      };
    });

    // sorting
    results.sort((a, b) => {
      if (sortBy === "matchScore") {
        return order === "asc" ? a.matchScore - b.matchScore : b.matchScore - a.matchScore;
      } else {
        return order === "asc"
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);
      }
    });

    // pagination
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    return res.json({
      success: true,
      results: paginated,
      totalPages,
      total,
      userSkills,
    });

  } catch (err) {
    console.error("MATCH ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

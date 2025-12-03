import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// CREATE Internship c1

export const createInternship = async (req, res) => {
  try {
    const { title, company, skills, location, stipend } = req.body;

    const internship = await prisma.internship.create({
      data: { title, company, skills, location, stipend }
    });

    res.json({ success: true, internship });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


//(Pagination, Search, Sort, Filter) r1

export const listInternships = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      order = "desc",
      location,
      skill
    } = req.query;

    const skip = (page - 1) * limit;

    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } }
      ];
    }

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (skill) {
      where.skills = { has: skill };
    }

    const internships = await prisma.internship.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      orderBy: { [sortBy]: order }
    });

    const total = await prisma.internship.count({ where });

    res.json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
      internships
    });

  } catch (err) {
    console.error("LIST ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// GET an Internship R2

export const getInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await prisma.internship.findUnique({
      where: { id }
    });

    if (!internship)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, internship });
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// UPDATE Internship U1

export const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const internship = await prisma.internship.update({
      where: { id },
      data
    });

    res.json({ success: true, internship });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// UPDATE Internship Skills U2

export const updateInternshipSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const { skills } = req.body;

    const internship = await prisma.internship.update({
      where: { id },
      data: { skills }
    });

    res.json({ success: true, internship });
  } catch (err) {
    console.error("PATCH ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// delete Internship d1

export const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.internship.delete({
      where: { id }
    });

    res.json({ success: true, message: "Internship deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//deletion of all internships - D2
export const deleteAllInternships = async (req, res) => {
  try {
    await prisma.internship.deleteMany({});

    res.json({ success: true, message: "All internships deleted" });
  } catch (err) {
    console.error("DELETE ALL ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

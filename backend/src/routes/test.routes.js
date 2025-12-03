import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  console.log("🔥 TEST POST HIT:", req.body);
  res.json({ ok: true, body: req.body });
});

export default router;

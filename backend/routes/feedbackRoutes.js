import express from "express";
import jwt from "jsonwebtoken";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// helper to get user from token (optional auth)
const getUserFromToken = (req) => {
  try {
    const header = req.headers.authorization;
    if (!header) return null;
    const token = header.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
};

/* POST - submit feedback */
router.post("/", async (req, res) => {
  try {
    const { message, rating } = req.body;
    const decoded = getUserFromToken(req);
    const feedback = new Feedback({
      message,
      rating,
      user:  decoded?.id  || null,
      email: decoded?.email || req.body.email || null,
    });
    await feedback.save();
    res.json({ success: true, message: "Feedback saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* GET - all feedback (admin) */
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

/* DELETE - remove feedback */
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;

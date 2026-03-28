import express from "express";
import History from "../models/History.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 GET HISTORY
router.get("/", authMiddleware, async (req, res) => {
  const history = await History.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(history);
});

// 🔴 DELETE ALL HISTORY (FOR LOGGED USER)
router.delete("/", authMiddleware, async (req, res) => {
  await History.deleteMany({ userId: req.user.id });
  res.json({ message: "History deleted successfully" });
});

// 🟡 UPDATE HISTORY BY ID
router.put("/:id", authMiddleware, async (req, res) => {
  const { disease, confidence } = req.body;

  const updated = await History.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { disease, confidence },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "History not found" });
  }

  res.json({
    message: "History updated successfully",
    updated
  });
});

export default router;

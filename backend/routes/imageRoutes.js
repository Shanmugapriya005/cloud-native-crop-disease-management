import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Disease from "../models/Disease.js";
import History from "../models/History.js";

const router = express.Router();

// Multer (memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });


// 📸 IMAGE UPLOAD + ANALYZE
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "crop_disease" }
      );

      // 🔍 TEMPORARY ML RESULT (DUMMY)
      const disease = "Leaf Blight";
      const confidence = 92;

      // 🔍 Fetch remedies from DB
      const diseaseData = await Disease.findOne({ name: disease });

      // Save history
      await History.create({
        user: req.userId,
        disease,
        confidence,
        imageUrl: uploadResult.secure_url,
      });

      res.json({
        message: "Image analyzed successfully",
        disease,
        confidence,
        causes: diseaseData?.causes || [],
        remedies: diseaseData?.remedies || [],
        natural: diseaseData?.natural || [],
        imageUrl: uploadResult.secure_url,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);

export default router;

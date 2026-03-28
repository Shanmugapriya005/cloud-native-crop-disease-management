import express from "express";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadImage, getMyUploads, getAllUploads } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), uploadImage);
router.get("/my", authMiddleware, getMyUploads);
router.get("/all", authMiddleware, getAllUploads); // admin: all uploads

export default router;

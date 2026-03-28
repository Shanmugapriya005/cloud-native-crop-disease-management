import Upload from "../models/Upload.js";

/**
 * UPLOAD IMAGE + PREDICTION DATA
 */
export const uploadImage = async (req, res) => {
  try {
    console.log("📂 UPLOAD CONTROLLER HIT");
    console.log("📂 req.user:", req.user);
    console.log("📂 req.file:", req.file ? req.file.filename : "NO FILE");
    console.log("📂 req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No image received" });
    }

    // Build public URL for the saved file
    const imageUrl = `http://localhost:5001/uploads/${req.file.filename}`;

    // Save to MongoDB with prediction data from body
    const newUpload = await Upload.create({
      user: req.user.id,
      imageName: req.file.originalname,
      imageUrl,
      publicId: req.file.filename,
      crop: req.body.crop || "",
      disease: req.body.disease || "",
      severity: req.body.severity || "",
      confidence: req.body.confidence || "",
    });

    console.log("✅ Saved to MongoDB:", newUpload._id, imageUrl);

    return res.status(201).json({
      message: "Upload saved successfully",
      imageUrl: newUpload.imageUrl,
      uploadId: newUpload._id,
    });
  } catch (error) {
    console.error("❌ UPLOAD ERROR:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

/**
 * GET LOGGED-IN USER UPLOAD HISTORY
 */
export const getMyUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ count: uploads.length, uploads });
  } catch (error) {
    console.error("❌ FETCH UPLOADS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch uploads" });
  }
};

/**
 * GET ALL UPLOADS (ADMIN)
 */
export const getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json(uploads);
  } catch (error) {
    console.error("❌ FETCH ALL UPLOADS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch uploads" });
  }
};

import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    crop: { type: String, default: "" },
    disease: { type: String, default: "" },
    severity: { type: String, default: "" },
    confidence: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Upload", uploadSchema);

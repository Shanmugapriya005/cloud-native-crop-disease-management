import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  message: { type: String, required: true },
  rating:  { type: Number, default: 5 },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email:   { type: String },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
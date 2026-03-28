import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  imageUrl: String,
  diseaseName: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.model("History", historySchema);

export default History;

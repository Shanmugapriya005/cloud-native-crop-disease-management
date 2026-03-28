import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  causes: [String],
  remedies: [String],
  natural: [String]
});

const Disease = mongoose.model("Disease", diseaseSchema);

export default Disease;

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "./models/User.js";

await mongoose.connect(process.env.MONGO_URI);

const user = await User.findOne({ email: "shanmugapriya3065@gmail.com" });
if (!user) {
  console.log("❌ User NOT found in DB");
} else {
  console.log("✅ Found:", user.email, "| role:", user.role);
  const m1 = await user.matchPassword("Admin@123");
  const m2 = await user.matchPassword("admin123");
  const m3 = await user.matchPassword("Admin@1234");
  console.log("Admin@123 :", m1);
  console.log("admin123  :", m2);
  console.log("Admin@1234:", m3);
}

await mongoose.disconnect();
process.exit(0);

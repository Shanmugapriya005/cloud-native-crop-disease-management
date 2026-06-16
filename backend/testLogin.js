import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

await mongoose.connect(process.env.MONGO_URI);

const email = "shanmugapriya3065@gmail.com";
const password = "admin123";

const user = await User.findOne({ email: email.trim().toLowerCase() });
if (!user) { console.log("User not found"); process.exit(1); }

const isMatch = await user.matchPassword(password);
console.log("matchPassword result:", isMatch);
console.log("role:", user.role);

if (isMatch) {
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  console.log("✅ Login would succeed. Token generated.");
  console.log("Response would be:", JSON.stringify({ token: token.substring(0,30)+"...", role: user.role, email: user.email }));
}

await mongoose.disconnect();
process.exit(0);

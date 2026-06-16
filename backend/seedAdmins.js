import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "./models/User.js";

const admins = [
  { name: "Shanmugapriya", email: "shanmugapriya3066@gmail.com" },
  { name: "Pranesh",       email: "pranesh6792@gmail.com" },
  { name: "Sha",           email: "12sha46@gmail.com" },
];

const PASSWORD = "@123Priya";

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected\n");

for (const admin of admins) {
  const existing = await User.findOne({ email: admin.email });

  if (existing) {
    existing.role     = "admin";
    existing.password = PASSWORD;   // pre-save hook will hash it
    existing.name     = admin.name;
    await existing.save();
    console.log(`✅ Updated  → ${admin.email} | role: admin`);
  } else {
    const newAdmin = new User({
      name:     admin.name,
      email:    admin.email,
      password: PASSWORD,
      role:     "admin",
    });
    await newAdmin.save();
    console.log(`✅ Created  → ${admin.email} | role: admin`);
  }
}

console.log("\nAll admins ready. Password: @123Priya");
await mongoose.disconnect();
process.exit(0);

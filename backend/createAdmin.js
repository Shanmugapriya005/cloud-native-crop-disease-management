import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User.js";

const ADMIN_EMAIL    = "shanmugapriya3065@gmail.com";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_NAME     = "Admin";

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const existing = await User.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      // promote to admin if already exists
      existing.role = "admin";
      await existing.save();
      console.log(`✅ User '${ADMIN_EMAIL}' promoted to admin.`);
    } else {
      const admin = new User({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin"
      });
      await admin.save();
      console.log(`✅ Admin created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err.message);
    process.exit(1);
  });

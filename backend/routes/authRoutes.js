import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   USER SIGNUP
========================= */
router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    // check if user exists
    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = new User({
      name,
      email: cleanEmail,
      password,
      role: "user"
    });

    await user.save();

    res.status(200).json({
      message: "Signup successful"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Signup failed"
    });

  }

});


/* =========================
   USER LOGIN
========================= */
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.lastLogin = new Date();
    user.isOnline = true;
    await user.save();

    res.status(200).json({
      token,
      role: user.role,
      email: user.email
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* =========================
   LOGOUT
========================= */
router.post("/logout", async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOneAndUpdate({ email }, { isOnline: false });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
});


/* =========================
   GET LOGGED IN USERS
========================= */
router.get("/logged-in", async (req, res) => {
  try {
    const users = await User.find({ isOnline: true }, "-password").sort({ lastLogin: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logged-in users" });
  }
});


/* =========================
   GET PROFILE
========================= */
router.get("/profile", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});


/* =========================
   SEED ADMIN (run once)
========================= */
router.post("/seed-admin", async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;
    if (secretKey !== "cropcare-admin-seed") {
      return res.status(403).json({ message: "Invalid secret key" });
    }
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      if (existing.role === "admin") return res.status(400).json({ message: "Admin already exists" });
      existing.role = "admin";
      await existing.save();
      return res.json({ message: "User promoted to admin" });
    }
    const admin = new User({ name, email: email.trim().toLowerCase(), password, role: "admin" });
    await admin.save();
    res.json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to seed admin" });
  }
});


/* =========================
   GET ALL USERS (DEBUG)
========================= */
router.get("/users", async (req, res) => {

  try {

    const users = await User.find({}, "-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching users"
    });

  }

});

export default router;
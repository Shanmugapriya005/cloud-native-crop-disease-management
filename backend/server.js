import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";


const app = express();

/* =====================
   Middleware
===================== */
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/feedback", feedbackRoutes);


/* =====================
   Routes
===================== */

app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/notifications", notificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Crop Disease Management API is running");
});

/* =====================
   Socket.io Setup
===================== */
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Make io available in routes
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* =====================
   MongoDB + Server Start
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    httpServer.listen(process.env.PORT || 5001, () => {
      console.log(
        `🚀 Server running on port ${process.env.PORT || 5001}`
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

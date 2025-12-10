// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ CORS - MUST come before any routes
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000","https://accreditation-chatbot.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Explicitly handle OPTIONS for all routes
app.options("*", cors());

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Add logging middleware to debug requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Accreditation Chatbot API is running...");
});

// ✅ Chatbot routes
app.use("/api/chatbot", chatbotRoutes);

// ✅ 404 handler
app.use((req, res) => {
  console.log("❌ 404 - Route not found:", req.path);
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
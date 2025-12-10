// routes/chatbotRoutes.js
import express from "express";
import { getResponse } from "../controllers/chatbotController.js";
import Chat from "../models/chatModel.js";

const router = express.Router();

console.log("✅ chatbotRoutes file loaded");

// POST - Send message
router.post("/", (req, res) => {
  console.log("✅ POST /api/chatbot route triggered");
  getResponse(req, res);
});

// GET - Retrieve chat history
router.get("/history", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 }).limit(50);
    res.json({ chats });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
});

export default router;
// models/chatModel.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userMessage: { 
    type: String, 
    required: true 
  },
  botReply: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  sessionId: {
    type: String,
    default: "default-session"
  }
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
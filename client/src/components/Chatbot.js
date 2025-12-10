// src/components/Chatbot.jsx
import React, { useState } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline"; 
import "../styles/chatbot.css"; 
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chatbot`,
        { message: input }
      );
      
     

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error("💥 Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="main-container">
      {/* Left: Spline bot */}
      <div className="bot-side">
        <Spline scene="https://prod.spline.design/hVzbqVhj1Xq31gwm/scene.splinecode" />
      </div>

      {/* Right: Chat UI */}
      <div className="chat-side">
        <div className="chat-card">
          <div className="chat-header">
            <h2>Accreditation Guidelines Chatbot</h2>
            <p>Your assistant for understanding accreditation processes</p>
          </div>

          <div className="chat-box">
            {messages.length === 0 ? (
              <div className="bot-message">
                Hello 👋 I'm your Accreditation Assistant. Ask me anything about accreditation guidelines!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Type your question about accreditation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

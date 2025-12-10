// controllers/chatbotController.js
import Chat from "../models/chatModel.js";

export const getResponse = async (req, res) => {
  console.log("✅ getResponse called");
  console.log("Incoming body:", req.body);
  
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const lowerMessage = message.toLowerCase();
    let reply;

    // Keyword-based responses for accreditation queries
    if (lowerMessage.includes("what") && lowerMessage.includes("accreditation")) {
      reply = "Accreditation is a formal recognition process where an educational institution or program is evaluated by an external accrediting body to ensure it meets established quality standards and criteria.";
    } 
    else if (lowerMessage.includes("naac")) {
      reply = "NAAC (National Assessment and Accreditation Council) is an autonomous body established by UGC in 1994. It assesses and accredits Higher Education Institutions (HEIs) in India based on seven criteria: Curricular Aspects, Teaching-Learning & Evaluation, Research, Infrastructure, Student Support, Governance, and Institutional Values.";
    } 
    else if (lowerMessage.includes("nba")) {
      reply = "NBA (National Board of Accreditation) is an autonomous body that accredits technical education programs in India, including engineering, management, pharmacy, and architecture programs. NBA accreditation is valid for 3 or 6 years depending on the outcome.";
    } 
    else if (lowerMessage.includes("criteria") || lowerMessage.includes("parameters")) {
      reply = "NAAC evaluates institutions on 7 key criteria:\n1. Curricular Aspects\n2. Teaching-Learning and Evaluation\n3. Research, Innovations and Extension\n4. Infrastructure and Learning Resources\n5. Student Support and Progression\n6. Governance, Leadership and Management\n7. Institutional Values and Best Practices";
    } 
    else if (lowerMessage.includes("grade") || lowerMessage.includes("cgpa")) {
      reply = "NAAC assigns grades based on CGPA:\n• A++ (3.51-4.00) - Excellent\n• A+ (3.26-3.50) - Very Good\n• A (3.01-3.25) - Good\n• B++ (2.76-3.00) - Fair\n• B+ (2.51-2.75) - Average\n• B (2.01-2.50) - Satisfactory\n• C (1.51-2.00) - Below Average";
    } 
    else if (lowerMessage.includes("benefit") || lowerMessage.includes("importance") || lowerMessage.includes("why")) {
      reply = "Benefits of Accreditation:\n✓ Quality assurance and improvement\n✓ Enhanced credibility and reputation\n✓ Better funding opportunities\n✓ Student confidence and employability\n✓ International recognition\n✓ Facilitates student/faculty exchange programs\n✓ Access to government grants and schemes";
    } 
    else if (lowerMessage.includes("process") || lowerMessage.includes("how to") || lowerMessage.includes("apply")) {
      reply = "NAAC Accreditation Process:\n1. Institution submits Letter of Intent (LoI)\n2. Institutional Information for Quality Assessment (IIQA) submission\n3. Self Study Report (SSR) preparation and submission\n4. Peer Team Visit for on-site assessment\n5. Final assessment and grading\n6. Accreditation certificate issued (valid for 5 years)";
    } 
    else if (lowerMessage.includes("validity") || lowerMessage.includes("duration") || lowerMessage.includes("how long")) {
      reply = "NAAC accreditation is valid for 5 years. Institutions need to apply for re-accreditation before the expiry. NBA accreditation for technical programs is typically valid for 3 or 6 years depending on the tier achieved.";
    } 
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      reply = "Hello! 👋 I'm your Accreditation Assistant. I can help you with information about NAAC, NBA, accreditation criteria, process, benefits, and more. What would you like to know?";
    } 
    else if (lowerMessage.includes("thank")) {
      reply = "You're welcome! Feel free to ask if you have more questions about accreditation. 😊";
    } 
    else {
      reply = "I can help you with information about:\n• What is accreditation\n• NAAC and NBA\n• Accreditation criteria and grades\n• Process and benefits\n• Validity and duration\n\nPlease ask me anything related to these topics!";
    }

    // ✅ Save chat to MongoDB
    try {
      const chat = new Chat({
        userMessage: message,
        botReply: reply,
        timestamp: new Date()
      });
      
      await chat.save();
      console.log("💾 Chat saved to MongoDB");
    } catch (dbError) {
      console.error("❌ Error saving to database:", dbError);
      // Don't fail the request if DB save fails
    }

    return res.json({ reply });
    
  } catch (error) {
    console.error("💥 Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
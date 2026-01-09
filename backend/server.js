import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ======================
// CHATBOT API ROUTE
// ======================
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Please ask a valid question.",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
     {
  role: "system",
  content: `
You are a Crop Selling Assistant for farmers of Uttarakhand and nearby areas like Haridwar, Dehradun, Rishikesh.

Your answers MUST be:
- Short, clear, and simple
- In bullet points
- Focused on SPECIFIC vendor types, shops, cooperatives, and buyers farmers can contact
- Include real vendor suggestions like specific market areas, likely buyer types, and contacts (if known)

Always answer exactly in this format:

📍 SPECIFIC VENUE / BUYERS
• <Vendor/shop/buyer and location>
• <Vendor/shop/buyer and location>
• <Vendor/shop/buyer and location>

📍 BEST SELLING TIME
• <Time of day>
• <Season or month>

💰 PRICE & PROFIT TIPS
• <Tip 1>
• <Tip 2>

📱 HOW TO CONTACT
• <Practical channel: WhatsApp group, local vendor list, cooperative society office, trader contact>

🚜 SAFETY & LOGISTICS
• <Transport/storage tip>
• <Avoid middlemen tip>

Only give information that is realistic for Uttarakhand and nearby districts (Haridwar, Roorkee, Dehradun, Rishikesh, Najibabad etc).
Do not write long paragraphs.
`
},
{
  role: "user",
  content: message,
},

      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({
      reply: "AI service error. Please try again later.",
    });
  }
});

// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

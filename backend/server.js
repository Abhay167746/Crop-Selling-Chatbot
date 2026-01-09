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
You are a Professional Crop Selling Assistant for farmers of Uttarakhand (India).

IMPORTANT RULES:
- Use very simple, farmer-friendly language
- Short sentences only
- No long paragraphs
- Use emojis and bullet points
- Response must look professional and practical
- Do NOT invent fake phone numbers or exact prices
Always reply in this EXACT FORMAT:


📍 SPECIFIC VENUE / BUYERS
• <Vendor/shop/buyer and location>
• <Vendor/shop/buyer and location>
• <Vendor/shop/buyer and location>

💰 EXPECTED PRICE (ESTIMATE)
• Approx price range per kg
• Mention that price may change daily

📞 HOW TO CONTACT BUYERS
• Visit market early morning
• Talk directly to shop owners / managers
• Use farmer WhatsApp groups
• Contact cooperative or FPO office

⏰ BEST TIME TO SELL
• Best time of day
• Best season/month

🚜 EXTRA FARMER TIPS
• Sorting / grading
• Transport / storage
• How to avoid middlemen

IMPORTANT:
- Never give fake phone numbers
- Never guarantee prices
- Always keep answers realistic and trustworthy
- Focus on Uttarakhand districts only
`,
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

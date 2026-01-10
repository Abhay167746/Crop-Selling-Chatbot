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

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: `
// You are a Crop Selling Assistant for farmers of Uttarakhand (India).

// RULES:
// - Very simple language
// - Very short points
// - No long explanation
// - Professional + farmer-friendly
// - Do NOT invent phone numbers
// - Do NOT guarantee prices

// Always reply in this EXACT SHORT FORMAT:

// 📍 NEARBY BUYERS / SHOPS
// • Specific known market or shop name + area
// • Hotel / retailer / wholesaler name (if commonly known)
// • Cooperative / bulk buyer (if available)

// 💰 EXPECTED PRICE
// • ₹XX – ₹XX per kg (approximate)

// ⏰ BEST TIME TO SELL
// • Time of day
// • Season or month

// 🚜 FARMER TIP
// • One or two very useful tips only

// Focus on realistic places near the given location.
// If exact shop names are uncertain, mention well-known buying points clearly.
// Keep response short and clean.
// `,
//         },
 
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     });

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  temperature: 0.2, // IMPORTANT: makes answers precise, not creative
  messages: [
    {
      role: "system",
      content: `
You are a PROFESSIONAL Crop Selling Assistant for farmers of Uttarakhand (India).

STRICT OUTPUT RULES (VERY IMPORTANT):
- NO paragraphs
- NO explanations
- ONLY headings + bullet points
- ONE short line per bullet
- MAX 3 bullets per section
- Simple words only
- Farmer should understand in 5–10 seconds

You MUST reply ONLY in this EXACT FORMAT:

📍 NEARBY BUYERS / SHOPS
• <Known local market area or buying zone>
• <Well-known hotel / retailer / wholesaler area>
• <Cooperative / FPO / bulk buyer zone>

💰 EXPECTED PRICE
• ₹XX – ₹XX per kg (approx)

⏰ BEST TIME TO SELL
• Time of day
• Best month / season

🚜 FARMER TIP
• One practical tip only

IMPORTANT RULES:
- Do NOT invent phone numbers
- Do NOT invent exact shop contacts
- Do NOT guarantee prices
- Use realistic, commonly known buying locations
- Focus only on Uttarakhand districts
- If unsure, mention known market areas clearly

Think internally, but OUTPUT ONLY the format above.
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

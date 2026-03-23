import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Groq Setup

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// Data Config

const crops = ["tomato", "onion", "potato", "cabbage", "cauliflower"];

const locations = ["haldwani", "kathgodam", "tikonia", "bareilly road"];

const mandiData = {
  tomato: { min: 18, max: 26 },
  onion: { min: 20, max: 32 },
  potato: { min: 12, max: 20 },
  cabbage: { min: 10, max: 18 },
  cauliflower: { min: 12, max: 22 },
};


// FIXED Mandi API Function

async function getMandiPrice(crop) {
  try {
    let allRecords = [];

    //  multiple pages fetch
    for (let i = 0; i < 3; i++) {
      const response = await axios.get(
        "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
        {
          params: {
            "api-key": process.env.DATA_GOV_API_KEY,
            format: "json",
            limit: 100,
            offset: i * 100,
          },
        }
      );

      allRecords = [...allRecords, ...response.data.records];
    }

    console.log("Total Records:", allRecords.length);

    //  better matching
    const filtered = allRecords.filter((item) => {
      const commodity = item.commodity?.toLowerCase() || "";
      return commodity.includes(crop);
    });

    console.log("Filtered Records:", filtered.length);

    if (filtered.length > 0) {
      const data = filtered[0];

      return {
        min: parseInt(data.min_price) || 0,
        max: parseInt(data.max_price) || 0,
      };
    }

    // fallback
    console.log("⚠️ No match found, using fallback");

    const data = allRecords[0];

    return {
      min: parseInt(data.min_price) || 0,
      max: parseInt(data.max_price) || 0,
    };

  } catch (error) {
    console.log("❌ API Error:", error.message);
    return null;
  }
}


// Helper Functions

function formatResponse(text) {
  return text
    .replace(/\n{2,}/g, "\n")
    .replace(/•\s*/g, "• ")
    .replace(/^\s+|\s+$/g, "")
    .trim();
}

function isHindiText(text) {
  return /[\u0900-\u097F]/.test(text);
}


// API ROUTE

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.json({ reply: "⚠️ Please ask a valid question." });
    }

    const lowerMsg = message.toLowerCase();

    // Crop detection
    const detectedCrop = crops.find((crop) =>
      lowerMsg.includes(crop)
    );

    if (!detectedCrop) {
      return res.json({
        reply:
          "⚠️ Please ask about: Tomato, Onion, Potato, Cabbage, Cauliflower.",
      });
    }

    // Location detection
    const detectedLocation =
      locations.find((loc) => lowerMsg.includes(loc)) || "haldwani";

    // Language detection
    const languageInstruction = isHindiText(message)
      ? "Respond in Hindi."
      : "Respond in English.";

    //  Real price fetch
    let price = await getMandiPrice(detectedCrop);

    if (!price) {
      console.log("⚠️ Using fallback price");
      price = mandiData[detectedCrop];
    }

    const priceContext = `Latest price for ${detectedCrop} in ${detectedLocation}: ₹${price.min}–₹${price.max} per kg.`;

    // Prompt
    const prompt = `
${languageInstruction}

You are a Professional Crop Selling Assistant for farmers in Haldwani (India).

${priceContext}

Use these known buyers:
- Naveen Mandi Haldwani
- Tikonia Market
- Kathgodam traders

━━━━━━━━━━━━━━━━━━━━━━━
STRICT RULES:
- NO paragraphs
- ONLY headings + bullet points
- Max 2 bullets per section
- Very short lines
- Use simple language
━━━━━━━━━━━━━━━━━━━━━━━

FORMAT:

📍 BEST NEARBY BUYERS / SHOPS
• Place + buyer type
• Place + buyer type

💰 EXPECTED PRICE
• ₹XX – ₹XX per kg (approx)

⏰ BEST TIME TO SELL
• Time of day
• Best season/month

🚜 IMPORTANT TIP
• One useful tip

━━━━━━━━━━━━━━━━━━━━━━━

User Question:
${message}
`;

    // Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are an expert agricultural assistant. Follow all formatting rules strictly.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawReply = completion.choices[0].message.content;

    // Fallback response
    if (!rawReply || rawReply.length < 20) {
      return res.json({
        reply: `📍 BEST NEARBY BUYERS / SHOPS
• Naveen Mandi Haldwani – wholesalers
• Tikonia Market – local retailers

💰 EXPECTED PRICE
• ₹${price.min} – ₹${price.max} per kg

⏰ BEST TIME TO SELL
• Early morning
• Seasonal demand period

🚜 IMPORTANT TIP
• Sort crops before selling`,
      });
    }

    const cleanReply = formatResponse(rawReply);

    res.json({ reply: cleanReply });

  } catch (error) {
    console.error("❌ Groq Error:", error);

    res.json({
      reply: "⚠️ AI service error. Please try again.",
    });
  }
});

// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import OpenAI from "openai";

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });


// // // API ROUTE

// // app.post("/api/chat", async (req, res) => {
// //   try {
// //     const { message } = req.body;

// //     if (!message || message.trim() === "") {
// //       return res.status(400).json({
// //         reply: "Please ask a valid question.",
// //       });
// //     }

// //     const completion = await openai.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       messages: [

// //         {
// //   role: "system",
// //   content: `
// // You are a Crop Selling Assistant for farmers of Uttarakhand (India).

// // GOAL:
// // Help farmers sell crops at the best nearby shop or buyer for better profit.

// // STRICT RULES:
// // - Use very simple words
// // - Short lines only
// // - NO paragraphs
// // - ONLY headings + bullet points
// // - Max 2 bullets per section
// // - Farmer should understand in 5–10 seconds
// // - Do NOT invent phone numbers
// // - Do NOT guarantee prices
// // - Be realistic and honest

// // ALWAYS reply in this EXACT FORMAT:

// // 📍 BEST NEARBY BUYERS / SHOPS
// // • Known shop / buyer name + area
// // • Hotel / retailer / wholesaler area nearby

// // 💰 EXPECTED PRICE
// // • ₹XX – ₹XX per kg (approx, may change daily)

// // ⏰ BEST TIME TO SELL
// // • Time of day
// // • Best month or season

// // 🚜 IMPORTANT TIP
// // • One very useful farmer tip

// // IMPORTANT:
// // - Focus ONLY on Uttarakhand districts
// // - Prefer local shops, hotels, retailers, bulk buyers
// // - Avoid mandi unless clearly useful
// // - If exact shop name is unsure, mention well-known buying areas`

// // },
// //         {
// //           role: "user",
// //           content: message,
// //         },
// //       ],
// //     });

// //     res.json({
// //       reply: completion.choices[0].message.content,
// //     });
// //   } catch (error) {
// //     console.error("❌ OpenAI Error:", error);
// //     res.status(500).json({
// //       reply: "AI service error. Please try again later.",
// //     });
// //   }
// // });

// // // ======================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Gemini setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });
// // ======================
// // CHATBOT API ROUTE
// // ======================
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || message.trim() === "") {
//       return res.json({
//         reply: "❌ Please ask a valid question.",
//       });
//     }

//     const prompt = `
// You are a Professional Crop Selling Assistant for farmers of Uttarakhand (India).

// IMPORTANT RULES:
// - Use simple language
// - Short bullet points
// - No paragraphs

// FORMAT:

// 📍 BEST NEARBY BUYERS / SHOPS
// • buyer or market area
// • retailer or hotel buyers nearby

// 💰 EXPECTED PRICE
// • ₹XX – ₹XX per kg (approx)

// ⏰ BEST TIME TO SELL
// • time of day
// • best season/month

// 🚜 IMPORTANT TIP
// • one useful tip

// Question:
// ${message}
// `;

//     const result = await model.generateContent(prompt);

//     const response = result.response.text();

//     res.json({
//       reply: response,
//     });

//   } catch (error) {
//     console.error("Gemini Error:", error);

//     res.json({
//       reply: "⚠️ AI service error. Please try again later.",
//     });
//   }
// });

// // ======================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// GEMINI SETUP
// ======================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Correct model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

// ======================
// CHATBOT API ROUTE
// ======================
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.json({
        reply: "❌ Please ask a valid question."
      });
    }

    const prompt = `
You are a Crop Selling Assistant for farmers of Uttarakhand (India).

RULES:
- Use simple language
- Short bullet points
- No paragraphs
- Farmer friendly
- No fake phone numbers
- No guaranteed prices

RESPONSE FORMAT:

📍 BEST NEARBY BUYERS / SHOPS
• buyer/shop name + area
• retailer / hotel buyer nearby

💰 EXPECTED PRICE
• ₹XX – ₹XX per kg (approx)

⏰ BEST TIME TO SELL
• time of day
• best month/season

🚜 IMPORTANT TIP
• one useful farmer tip

Farmer Question:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    res.json({
      reply: text
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.json({
      reply: "⚠️ AI service error. Please try again later."
    });
  }
});

// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
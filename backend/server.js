// import axios from "axios";
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";
// import chatRoutes from "./routes/chatRoutes.js";
// import connectDB from "./config/db.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());


// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || message.trim() === "") {
//       return res.json({ reply: "⚠️ Please ask a valid question." });
//     }

//     const lowerMsg = message.toLowerCase();

//     // ======================
//     // 🔹 Crop Detection
//     // ======================
//     const detectedCrop = crops.find((crop) =>
//       lowerMsg.includes(crop)
//     );

//     if (!detectedCrop) {
//       return res.json({
//         reply:
//           "⚠️ Please ask about: Tomato, Onion, Potato, Cabbage, Cauliflower.",
//       });
//     }

//     // ======================
//     // 🔹 Quantity Detection
//     // ======================
//     const quantityMatch = message.match(/\d+/);
//     const quantity = quantityMatch ? parseInt(quantityMatch[0]) : null;

//     // ======================
//     // 🔹 Logistics Optimization
//     // ======================
//     let logisticsTip = "";
//     if (quantity && quantity > 100) {
//       logisticsTip = "Best for bulk: Naveen Mandi (wholesalers)";
//     } else {
//       logisticsTip = "Best for small quantity: Tikonia Market (retail)";
//     }

//     // ======================
//     // 🔹 Demand Forecast
//     // ======================
//     const demandMap = {
//       tomato: "High demand (seasonal consumption)",
//       onion: "Stable demand (daily use)",
//       potato: "Moderate demand",
//       cabbage: "Low demand (off-season)",
//       cauliflower: "High demand",
//     };

//     const demand = demandMap[detectedCrop];

//     // ======================
//     // 🔹 Price Trend
//     // ======================
//     const trendMap = {
//       tomato: "Prices increasing slightly",
//       onion: "Prices stable",
//       potato: "Prices stable",
//       cabbage: "Prices decreasing",
//       cauliflower: "Prices increasing",
//     };

//     const trend = trendMap[detectedCrop];

//     // ======================
//     // 🔹 Location
//     // ======================
//     const detectedLocation =
//       locations.find((loc) => lowerMsg.includes(loc)) || "haldwani";

//     // ======================
//     // 🔹 Language
//     // ======================
//     const languageInstruction = isHindiText(message)
//       ? "Respond in Hindi."
//       : "Respond in English.";

//     // ======================
//     // 🔹 Price Fetch
//     // ======================
//     let price = await getMandiPrice(detectedCrop);

//     if (!price) {
//       console.log("⚠️ Using fallback price");
//       price = mandiData[detectedCrop];
//     }

//     const priceContext = `₹${price.min}–₹${price.max} per kg`;

//     // ======================
//     // 🔹 UPDATED PROMPT
//     // ======================
//     const prompt = `
// ${languageInstruction}

// You are an AI Crop Selling Assistant for farmers in Haldwani (India).

// ━━━━━━━━━━━━━━━━━━━━━━━
// STRICT RULES:
// - NO paragraphs
// - ONLY headings + bullet points
// - Max 2 bullets per section
// - Very short lines
// - Simple language
// ━━━━━━━━━━━━━━━━━━━━━━━

// 📍 BEST NEARBY BUYERS / SHOPS
// • Naveen Mandi – wholesalers
// • Tikonia Market – retailers

// 💰 EXPECTED PRICE
// • ${priceContext}

// 📈 PRICE TREND
// • ${trend}

// 📊 DEMAND FORECAST
// • ${demand}

// 🚚 LOGISTICS SUGGESTION
// • ${logisticsTip}

// ⏰ BEST TIME TO SELL
// • Early morning
// • Seasonal demand period

// 🚜 IMPORTANT TIP
// • Sort crops before selling

// ━━━━━━━━━━━━━━━━━━━━━━━

// User Question:
// ${message}
// `;

//     // ======================
//     // 🔹 Groq API
//     // ======================
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       temperature: 0.2,
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an expert agricultural assistant. Follow all formatting rules strictly.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const rawReply = completion.choices[0].message.content;

//     if (!rawReply || rawReply.length < 20) {
//       return res.json({
//         reply: `📍 BEST NEARBY BUYERS / SHOPS
// • Naveen Mandi – wholesalers
// • Tikonia Market – retailers

// 💰 EXPECTED PRICE
// • ${priceContext}

// 📈 PRICE TREND
// • ${trend}

// 📊 DEMAND FORECAST
// • ${demand}

// 🚚 LOGISTICS SUGGESTION
// • ${logisticsTip}

// 🚜 IMPORTANT TIP
// • Sort crops before selling`,
//       });
//     }

//     const cleanReply = formatResponse(rawReply);

//     res.json({ reply: cleanReply });

//   } catch (error) {
//     console.error("❌ Groq Error:", error);

//     res.json({
//       reply: "⚠️ AI service error. Please try again.",
//     });
//   }
// });

// // app.use("/api/chats", chatRoutes);
// // connectDB();
// // // Groq Setup

// // const groq = new Groq({
// //   apiKey: process.env.GROQ_API_KEY,
// // });


// // // Data Config

// // const crops = ["tomato", "onion", "potato", "cabbage", "cauliflower"];

// // const locations = ["haldwani", "kathgodam", "tikonia", "bareilly road"];

// // const mandiData = {
// //   tomato: { min: 18, max: 26 },
// //   onion: { min: 20, max: 32 },
// //   potato: { min: 12, max: 20 },
// //   cabbage: { min: 10, max: 18 },
// //   cauliflower: { min: 12, max: 22 },
// // };


// // // FIXED Mandi API Function

// // async function getMandiPrice(crop) {
// //   try {
// //     let allRecords = [];

// //     //  multiple pages fetch
// //     for (let i = 0; i < 3; i++) {
// //       const response = await axios.get(
// //         "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
// //         {
// //           params: {
// //             "api-key": process.env.DATA_GOV_API_KEY,
// //             format: "json",
// //             limit: 100,
// //             offset: i * 100,
// //           },
// //         }
// //       );

// //       allRecords = [...allRecords, ...response.data.records];
// //     }

// //     console.log("Total Records:", allRecords.length);

// //     //  better matching
// //     const filtered = allRecords.filter((item) => {
// //       const commodity = item.commodity?.toLowerCase() || "";
// //       return commodity.includes(crop);
// //     });

// //     console.log("Filtered Records:", filtered.length);

// //     if (filtered.length > 0) {
// //       const data = filtered[0];

// //       return {
// //         min: parseInt(data.min_price) || 0,
// //         max: parseInt(data.max_price) || 0,
// //       };
// //     }

// //     // fallback
// //     console.log("⚠️ No match found, using fallback");

// //     const data = allRecords[0];

// //     return {
// //       min: parseInt(data.min_price) || 0,
// //       max: parseInt(data.max_price) || 0,
// //     };

// //   } catch (error) {
// //     console.log("❌ API Error:", error.message);
// //     return null;
// //   }
// // }


// // // Helper Functions

// // function formatResponse(text) {
// //   return text
// //     .replace(/\n{2,}/g, "\n")
// //     .replace(/•\s*/g, "• ")
// //     .replace(/^\s+|\s+$/g, "")
// //     .trim();
// // }

// // function isHindiText(text) {
// //   return /[\u0900-\u097F]/.test(text);
// // }


// // // API ROUTE

// // app.post("/api/chat", async (req, res) => {
// //   try {
// //     const { message } = req.body;

// //     if (!message || message.trim() === "") {
// //       return res.json({ reply: "⚠️ Please ask a valid question." });
// //     }

// //     const lowerMsg = message.toLowerCase();

// //     // Crop detection
// //     const detectedCrop = crops.find((crop) =>
// //       lowerMsg.includes(crop)
// //     );

// //     if (!detectedCrop) {
// //       return res.json({
// //         reply:
// //           "⚠️ Please ask about: Tomato, Onion, Potato, Cabbage, Cauliflower.",
// //       });
// //     }

// //     // Location detection
// //     const detectedLocation =
// //       locations.find((loc) => lowerMsg.includes(loc)) || "haldwani";

// //     // Language detection
// //     const languageInstruction = isHindiText(message)
// //       ? "Respond in Hindi."
// //       : "Respond in English.";

// //     //  Real price fetch
// //     let price = await getMandiPrice(detectedCrop);

// //     if (!price) {
// //       console.log("⚠️ Using fallback price");
// //       price = mandiData[detectedCrop];
// //     }

// //     const priceContext = `Latest price for ${detectedCrop} in ${detectedLocation}: ₹${price.min}–₹${price.max} per kg.`;

// //     // Prompt
// //     const prompt = `
// // ${languageInstruction}

// // You are a Professional Crop Selling Assistant for farmers in Haldwani (India).

// // ${priceContext}

// // Use these known buyers:
// // - Naveen Mandi Haldwani
// // - Tikonia Market
// // - Kathgodam traders

// // ━━━━━━━━━━━━━━━━━━━━━━━
// // STRICT RULES:
// // - NO paragraphs
// // - ONLY headings + bullet points
// // - Max 2 bullets per section
// // - Very short lines
// // - Use simple language
// // ━━━━━━━━━━━━━━━━━━━━━━━

// // FORMAT:

// // 📍 BEST NEARBY BUYERS / SHOPS
// // • Place + buyer type
// // • Place + buyer type

// // 💰 EXPECTED PRICE
// // • ₹XX – ₹XX per kg (approx)

// // ⏰ BEST TIME TO SELL
// // • Time of day
// // • Best season/month

// // 🚜 IMPORTANT TIP
// // • One useful tip

// // ━━━━━━━━━━━━━━━━━━━━━━━

// // User Question:
// // ${message}
// // `;

// //     // Groq API
// //     const completion = await groq.chat.completions.create({
// //       model: "llama-3.1-8b-instant",
// //       temperature: 0.2,
// //       messages: [
// //         {
// //           role: "system",
// //           content:
// //             "You are an expert agricultural assistant. Follow all formatting rules strictly.",
// //         },
// //         {
// //           role: "user",
// //           content: prompt,
// //         },
// //       ],
// //     });

// //     const rawReply = completion.choices[0].message.content;

// //     // Fallback response
// //     if (!rawReply || rawReply.length < 20) {
// //       return res.json({
// //         reply: `📍 BEST NEARBY BUYERS / SHOPS
// // • Naveen Mandi Haldwani – wholesalers
// // • Tikonia Market – local retailers

// // 💰 EXPECTED PRICE
// // • ₹${price.min} – ₹${price.max} per kg

// // ⏰ BEST TIME TO SELL
// // • Early morning
// // • Seasonal demand period

// // 🚜 IMPORTANT TIP
// // • Sort crops before selling`,
// //       });
// //     }

// //     const cleanReply = formatResponse(rawReply);

// //     res.json({ reply: cleanReply });

// //   } catch (error) {
// //     console.error("❌ Groq Error:", error);

// //     res.json({
// //       reply: "⚠️ AI service error. Please try again.",
// //     });
// //   }
// // });

// // ======================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

// import axios from "axios";
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";
// import chatRoutes from "./routes/chatRoutes.js";
// import connectDB from "./config/db.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/chats", chatRoutes);
// connectDB();

// // ======================
// // 🔹 Groq Setup
// // ======================
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// // ======================
// // 🔹 Data Config
// // ======================
// const crops = ["tomato", "onion", "potato", "cabbage", "cauliflower"];

// const locations = ["haldwani", "kathgodam", "tikonia", "bareilly road"];

// const mandiData = {
//   tomato: { min: 18, max: 26 },
//   onion: { min: 20, max: 32 },
//   potato: { min: 12, max: 20 },
//   cabbage: { min: 10, max: 18 },
//   cauliflower: { min: 12, max: 22 },
// };

// // ======================
// // 🔹 Mandi API Function
// // ======================
// async function getMandiPrice(crop) {
//   try {
//     let allRecords = [];

//     for (let i = 0; i < 3; i++) {
//       const response = await axios.get(
//         "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
//         {
//           params: {
//             "api-key": process.env.DATA_GOV_API_KEY,
//             format: "json",
//             limit: 100,
//             offset: i * 100,
//           },
//         }
//       );

//       allRecords = [...allRecords, ...response.data.records];
//     }

//     const filtered = allRecords.filter((item) => {
//       const commodity = item.commodity?.toLowerCase() || "";
//       return commodity.includes(crop);
//     });

//     if (filtered.length > 0) {
//       const data = filtered[0];
//       return {
//         min: parseInt(data.min_price) || 0,
//         max: parseInt(data.max_price) || 0,
//       };
//     }

//     // fallback
//     const data = allRecords[0];
//     return {
//       min: parseInt(data.min_price) || 0,
//       max: parseInt(data.max_price) || 0,
//     };

//   } catch (error) {
//     console.log("❌ API Error:", error.message);
//     return null;
//   }
// }

// // ======================
// // 🔹 Helpers
// // ======================
// function formatResponse(text) {
//   return text
//     .replace(/\n{2,}/g, "\n")
//     .replace(/•\s*/g, "• ")
//     .trim();
// }

// function isHindiText(text) {
//   return /[\u0900-\u097F]/.test(text);
// }

// // ======================
// // 🚀 API ROUTE
// // ======================
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || message.trim() === "") {
//       return res.json({ reply: "⚠️ Please ask a valid question." });
//     }

//     const lowerMsg = message.toLowerCase();

//     // Crop detection
//     const detectedCrop = crops.find((crop) =>
//       lowerMsg.includes(crop)
//     );

//     if (!detectedCrop) {
//       return res.json({
//         reply:
//           "⚠️ Please ask about: Tomato, Onion, Potato, Cabbage, Cauliflower.",
//       });
//     }

//     // Quantity detection
//     const quantityMatch = message.match(/\d+/);
//     const quantity = quantityMatch ? parseInt(quantityMatch[0]) : null;

//     // Logistics
//     let logisticsTip = "";
//     if (quantity && quantity > 100) {
//       logisticsTip = "Best for bulk: Naveen Mandi (wholesalers)";
//     } else {
//       logisticsTip = "Best for small: Tikonia Market (retail)";
//     }

//     // Demand Forecast
//     const demandMap = {
//       tomato: "High demand (seasonal)",
//       onion: "Stable demand",
//       potato: "Moderate demand",
//       cabbage: "Low demand",
//       cauliflower: "High demand",
//     };

//     const demand = demandMap[detectedCrop];

//     // Price Trend
//     const trendMap = {
//       tomato: "Prices increasing",
//       onion: "Prices stable",
//       potato: "Prices stable",
//       cabbage: "Prices decreasing",
//       cauliflower: "Prices increasing",
//     };

//     const trend = trendMap[detectedCrop];

//     // Location
//     const detectedLocation =
//       locations.find((loc) => lowerMsg.includes(loc)) || "haldwani";

//     // Language
//     const languageInstruction = isHindiText(message)
//       ? "Respond in Hindi."
//       : "Respond in English.";

//     // Price fetch
//     let price = await getMandiPrice(detectedCrop);

//     if (!price) {
//       price = mandiData[detectedCrop];
//     }

//     const priceContext = `₹${price.min}–₹${price.max} per kg`;

//     // ======================
//     // 🔥 FINAL PROMPT
//     // ======================
//     const prompt = `
// ${languageInstruction}

// You are a STRICT agricultural AI assistant.

// ⚠️ MUST FOLLOW:
// - NO paragraphs
// - ONLY headings + bullet points
// - DO NOT skip any section

// ━━━━━━━━━━━━━━━━━━━━━━━

// 📍 BEST NEARBY BUYERS / SHOPS
// • Naveen Mandi – wholesalers
// • Tikonia Market – retailers

// 💰 EXPECTED PRICE
// • ${priceContext}

// 📈 PRICE TREND
// • ${trend}

// 📊 DEMAND FORECAST
// • ${demand}

// 🚚 LOGISTICS SUGGESTION
// • ${logisticsTip}

// ⏰ BEST TIME TO SELL
// • Early morning
// • Seasonal demand period

// 🚜 IMPORTANT TIP
// • Sort crops before selling

// ━━━━━━━━━━━━━━━━━━━━━━━

// User Question:
// ${message}
// `;

//     // Groq API
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       temperature: 0.2,
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an expert agricultural assistant. Follow format strictly.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const reply = formatResponse(
//       completion.choices[0].message.content
//     );

//     res.json({ reply });

//   } catch (error) {
//     console.error("❌ Error:", error);

//     res.json({
//       reply: "⚠️ Server error. Please try again.",
//     });
//   }
// });

// // ======================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chats", chatRoutes);
connectDB();

// ======================
// 🔹 Data Config
// ======================
const crops = ["tomato", "onion", "potato", "cabbage", "cauliflower"];

const locations = ["haldwani", "kathgodam", "tikonia", "bareilly road"];

const mandiData = {
  tomato: { min: 18, max: 26 },
  onion: { min: 20, max: 32 },
  potato: { min: 12, max: 20 },
  cabbage: { min: 10, max: 18 },
  cauliflower: { min: 12, max: 22 },
};

// ======================
// 🔹 Mandi API Function
// ======================
async function getMandiPrice(crop) {
  try {
    let allRecords = [];

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

    const filtered = allRecords.filter((item) => {
      const commodity = item.commodity?.toLowerCase() || "";
      return commodity.includes(crop);
    });

    if (filtered.length > 0) {
      const data = filtered[0];
      return {
        min: parseInt(data.min_price) || 0,
        max: parseInt(data.max_price) || 0,
      };
    }

    // fallback
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

// ======================
// 🔹 Smart Response Builder
// ======================
function buildFinalResponse({
  crop,
  location,
  price,
  trend,
  demand,
  logisticsTip,
  advice,
}) {
  return `
🌾 CROP: ${crop.toUpperCase()} | 📍 Location: ${location}

━━━━━━━━━━━━━━━━━━━

💰 PRICE RANGE
→ ₹${price.min} – ₹${price.max} per kg

📈 MARKET TREND
→ ${trend}

📊 DEMAND
→ ${demand}

━━━━━━━━━━━━━━━━━━━

🚚 WHERE TO SELL?
→ ${logisticsTip}

⏰ BEST TIME
→ Early morning (5–9 AM)

━━━━━━━━━━━━━━━━━━━

🧠 SELLING STRATEGY
→ ${advice}

🚜 PRO TIP
→ Sort & grade crops for better price
`.trim();
}

// ======================
// 🚀 API ROUTE
// ======================
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
          "⚠️ Ask about: Tomato, Onion, Potato, Cabbage, Cauliflower.",
      });
    }

    // Quantity detection
    const quantityMatch = message.match(/\d+/);
    const quantity = quantityMatch ? parseInt(quantityMatch[0]) : null;

    // Logistics decision
    let logisticsTip = "";
    if (quantity && quantity > 100) {
      logisticsTip = "Sell at Naveen Mandi (Best for bulk)";
    } else {
      logisticsTip = "Sell at Tikonia Market (Best for small quantity)";
    }

    // Demand Forecast
    const demandMap = {
      tomato: "High demand 🔥",
      onion: "Stable demand",
      potato: "Moderate demand",
      cabbage: "Low demand",
      cauliflower: "High demand 🔥",
    };

    const demand = demandMap[detectedCrop];

    // Price Trend
    const trendMap = {
      tomato: "Prices increasing 📈",
      onion: "Prices stable",
      potato: "Prices stable",
      cabbage: "Prices decreasing 📉",
      cauliflower: "Prices increasing 📈",
    };

    const trend = trendMap[detectedCrop];

    // Smart advice
    let advice = "";
    if (trend.includes("increasing")) {
      advice = "Hold for 1–2 days for better price 📈";
    } else if (trend.includes("decreasing")) {
      advice = "Sell quickly before price drops ⚠️";
    } else {
      advice = "Stable market — sell anytime";
    }

    // Location detection
    const detectedLocation =
      locations.find((loc) => lowerMsg.includes(loc)) || "haldwani";

    // Price fetch
    let price = await getMandiPrice(detectedCrop);

    if (!price) {
      price = mandiData[detectedCrop];
    }

    // Final structured response
    const finalReply = buildFinalResponse({
      crop: detectedCrop,
      location: detectedLocation,
      price,
      trend,
      demand,
      logisticsTip,
      advice,
    });

    res.json({ reply: finalReply });

  } catch (error) {
    console.error("❌ Error:", error);

    res.json({
      reply: "⚠️ Server error. Please try again.",
    });
  }
});

// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
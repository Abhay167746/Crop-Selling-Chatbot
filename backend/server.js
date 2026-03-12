import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* Supported Crops */
const crops = ["tomato", "onion", "potato", "cabbage", "cauliflower"];

/* Greeting words */
const greetings = ["hi", "hello", "namaste", "hey"];

/* Haldwani Market Data */
const marketData = {
  tomato: {
    price: "₹20 – ₹35 per kg",
    buyers: [
      "Haldwani Sabzi Mandi",
      "Local retailers in Sadar Bazar"
    ]
  },

  onion: {
    price: "₹25 – ₹40 per kg",
    buyers: [
      "Haldwani Sabzi Mandi",
      "Wholesale vegetable traders"
    ]
  },

  potato: {
    price: "₹18 – ₹30 per kg",
    buyers: [
      "Haldwani Sabzi Mandi",
      "Local grocery stores"
    ]
  },

  cabbage: {
    price: "₹12 – ₹20 per kg",
    buyers: [
      "Haldwani vegetable market",
      "Nearby vegetable retailers"
    ]
  },

  cauliflower: {
    price: "₹15 – ₹25 per kg",
    buyers: [
      "Haldwani Sabzi Mandi",
      "Vegetable wholesalers"
    ]
  }
};

/* Detect Crop */
function detectCrop(message) {
  return crops.find(crop => message.includes(crop));
}

app.post("/api/chat", async (req, res) => {

  try {

    const message = req.body.message.toLowerCase().trim();

    /* Greeting */

    if (greetings.some(g => message.includes(g))) {
      return res.json({
        reply: `👋 Namaste! I am your Crop Selling Assistant for the Haldwani region.

You can ask about:

• Tomato
• Onion
• Potato
• Cabbage
• Cauliflower

Example:
"Tomato price in Haldwani"`
      });
    }

    /* Detect Crop */

    const crop = detectCrop(message);

    if (!crop) {
      return res.json({
        reply: `🌾 Please ask about these crops:

• Tomato
• Onion
• Potato
• Cabbage
• Cauliflower`
      });
    }

    /* Handle single crop word */

    if (message === crop) {
      return res.json({
        reply: `🌾 You selected ${crop}.

What would you like to know?

• ${crop} price in Haldwani
• Where can I sell ${crop}
• Best time to sell ${crop}`
      });
    }

    /* Get Local Market Data */

    const data = marketData[crop];

    /* AI only generates tip */

    const aiTip = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Give one short practical selling tip for farmers selling ${crop} in Haldwani market.`
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    const tip = aiTip.choices[0].message.content;

    res.json({
      reply: `📍 BEST NEARBY BUYERS / SHOPS
• ${data.buyers[0]}
• ${data.buyers[1]}

💰 EXPECTED PRICE
• ${data.price}

⏰ BEST TIME TO SELL
• Early morning (6 AM – 10 AM)

🚜 IMPORTANT TIP
• ${tip}`
    });

  } catch (error) {

    console.error(error);

    res.json({
      reply: "⚠️ AI service error."
    });

  }

});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
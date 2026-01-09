import { motion } from "framer-motion";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";

function Home() {
  const { language } = useContext(LanguageContext);

  const text = {
    en: {
      heroTitle: "Crop Selling AI Assistant",
      heroDesc:
        "A trusted AI platform built for farmers of Uttarakhand to identify the best nearby markets and earn better prices for their crops.",
      ctaPrimary: "Talk to AI",
      ctaSecondary: "Farmer Registration",

      feature1Title: "Designed for Farmers",
      feature1Desc:
        "Simple language, large buttons, and easy steps — no technical knowledge required.",

      feature2Title: "Increase Your Income",
      feature2Desc:
        "Get AI-based market suggestions to avoid middlemen and sell at better prices.",

      feature3Title: "AI Crop Advisor",
      feature3Desc:
        "Enter crop, quantity, and location to receive instant selling guidance.",

      trustLine: "Trusted by farmers • Built for Uttarakhand • Powered by AI",
    },

    hi: {
      heroTitle: "फसल बिक्री AI सहायक",
      heroDesc:
        "उत्तराखंड के किसानों के लिए बनाया गया भरोसेमंद AI प्लेटफॉर्म जो सही बाजार और बेहतर दाम बताता है।",
      ctaPrimary: "AI से बात करें",
      ctaSecondary: "किसान रजिस्ट्रेशन",

      feature1Title: "किसानों के लिए डिज़ाइन",
      feature1Desc:
        "सरल भाषा, बड़े बटन और आसान उपयोग — बिना तकनीकी ज्ञान के।",

      feature2Title: "अधिक आमदनी",
      feature2Desc:
        "AI आधारित सुझावों से बिचौलियों से बचें और सही दाम पाएं।",

      feature3Title: "AI फसल सलाहकार",
      feature3Desc:
        "फसल, मात्रा और स्थान डालें और तुरंत सुझाव प्राप्त करें।",

      trustLine: "किसानों का भरोसा • उत्तराखंड केंद्रित • AI आधारित",
    },
  };

  const t = text[language];

  return (
    <div className="bg-gradient-to-b from-green-100 via-green-50 to-white">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        {/* Badge */}
        <div className="mb-5 px-4 py-1 rounded-full bg-green-200 text-green-800 text-sm font-semibold">
          🌱 AI for Farmers
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 mb-6 leading-tight">
          🌾 {t.heroTitle}
        </h1>

        <p className="text-lg md:text-xl max-w-3xl text-gray-700 mb-10">
          {t.heroDesc}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            to="/login"
            className="bg-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold
                       hover:bg-green-800 transition-all shadow-xl hover:scale-[1.03]"
          >
            {t.ctaPrimary}
          </Link>

          <Link
            to="/signup"
            className="bg-white text-green-700 border-2 border-green-700 px-10 py-4 rounded-full
                       text-lg font-semibold hover:bg-green-100 transition-all shadow-md hover:scale-[1.03]"
          >
            {t.ctaSecondary}
          </Link>
        </div>

        {/* Trust Line */}
        <p className="mt-10 text-sm text-gray-600 font-medium">
          {t.trustLine}
        </p>
      </motion.section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t.feature1Title, desc: t.feature1Desc, icon: "🌱" },
            { title: t.feature2Title, desc: t.feature2Desc, icon: "💰" },
            { title: t.feature3Title, desc: t.feature3Desc, icon: "🤖" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all
                         border border-green-100"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-green-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;


import { motion } from "framer-motion";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";

function Home() {
  const { language } = useContext(LanguageContext);

  const text = {
    en: {
      titleTop: "Smart Crop Selling",
      titleBottom: "Powered by AI",
      desc:
        "A simple AI assistant built for farmers of Uttarakhand to find the right buyer and sell crops at better prices.",

      ctaPrimary: "Talk to AI",
      ctaSecondary: "Farmer Registration",

      feature1Title: "Farmer Friendly Design",
      feature1Desc:
        "Simple language, big buttons and easy steps. No technical knowledge needed.",

      feature2Title: "Better Selling Price",
      feature2Desc:
        "AI suggests nearby buyers to avoid middlemen and earn more.",

      feature3Title: "Instant Crop Advice",
      feature3Desc:
        "Enter crop, quantity and location to get quick guidance.",
    },

    hi: {
      titleTop: "स्मार्ट फसल बिक्री",
      titleBottom: "AI द्वारा संचालित",
      desc:
        "उत्तराखंड के किसानों के लिए बनाया गया सरल AI सहायक जो सही खरीदार और बेहतर दाम बताता है।",

      ctaPrimary: "AI से बात करें",
      ctaSecondary: "किसान रजिस्ट्रेशन",

      feature1Title: "किसान अनुकूल डिज़ाइन",
      feature1Desc:
        "सरल भाषा, बड़े बटन और आसान उपयोग।",

      feature2Title: "बेहतर दाम",
      feature2Desc:
        "AI सुझावों से बिचौलियों से बचें।",

      feature3Title: "तुरंत फसल सलाह",
      feature3Desc:
        "फसल और स्थान डालें, तुरंत जवाब पाएं।",
    },
  };

  const t = text[language];

  return (
    <div className="bg-gradient-to-b from-green-100 via-green-50 to-white">

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6"
      >

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
          {t.titleTop}
        </h1>

        <h2 className="text-4xl md:text-6xl font-extrabold text-green-700 mt-2">
          {t.titleBottom}
        </h2>

        {/* Description */}
        <p className="mt-5 text-lg md:text-xl max-w-2xl text-gray-600">
          {t.desc}
        </p>

        {/* CTA */}
        <div className="mt-7 flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="bg-green-700 text-white px-9 py-3 rounded-full text-lg font-semibold
                       hover:bg-green-800 transition shadow-lg"
          >
            🌾 {t.ctaPrimary}
          </Link>

          <Link
            to="/signup"
            className="bg-white text-green-700 border border-green-700 px-9 py-3 rounded-full
                       text-lg font-semibold hover:bg-green-100 transition shadow"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </motion.section>

      {/* FEATURES SECTION (TIGHT GAP) */}
      <section className="pb-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: t.feature1Title, desc: t.feature1Desc, icon: "🌱" },
            { title: t.feature2Title, desc: t.feature2Desc, icon: "💰" },
            { title: t.feature3Title, desc: t.feature3Desc, icon: "🤖" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-xl p-6 text-center
                         shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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


import { motion } from "framer-motion";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import bgImage from "../assets/bb1.avif";

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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 text-white"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

        <div className="relative z-10 max-w-3xl">

          <h1 className="text-4xl md:text-6xl font-extrabold">
            {t.titleTop}
          </h1>

          <h2 className="text-4xl md:text-6xl font-extrabold text-green-300 mt-2">
            {t.titleBottom}
          </h2>

          <p className="mt-6 text-lg md:text-xl text-gray-200">
            {t.desc}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              to="/login"
              className="bg-green-600 px-10 py-3 rounded-full text-lg font-semibold
              hover:bg-green-700 transition shadow-xl"
            >
              🌾 {t.ctaPrimary}
            </Link>

            <Link
              to="/signup"
              className="bg-white/20 backdrop-blur-md border border-white
              px-10 py-3 rounded-full text-lg font-semibold
              hover:bg-white/30 transition"
            >
              {t.ctaSecondary}
            </Link>

          </div>

        </div>

      </motion.section>


      {/* FEATURES SECTION */}

      {/* <section className="py-20 -mt-20 relative z-10"> */}
<section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

          {[
            { title: t.feature1Title, desc: t.feature1Desc, icon: "🌱" },
            { title: t.feature2Title, desc: t.feature2Desc, icon: "💰" },
            { title: t.feature3Title, desc: t.feature3Desc, icon: "🤖" },
          ].map((feature, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="
              bg-white/90 backdrop-blur-md
              rounded-2xl p-8 text-center
              shadow-lg hover:shadow-2xl
              border border-green-100
              transition-all duration-300
              "
            >

              <div className="text-5xl mb-5">{feature.icon}</div>

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
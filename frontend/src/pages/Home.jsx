

// import { motion } from "framer-motion";
// import { useContext } from "react";
// import { LanguageContext } from "../context/LanguageContext";
// import { Link } from "react-router-dom";
// import bgImage from "../assets/bb1.avif";

// function Home() {
//   const { language } = useContext(LanguageContext);

//   const text = {
//     en: {
//       titleTop: "Smart Crop Selling",
//       titleBottom: "Powered by AI",
//       desc:
//         "An AI assistant helping farmers find the right buyers, better prices, and smarter selling decisions.",

//       ctaPrimary: "Talk to AI",
//       ctaSecondary: "Farmer Registration",

//       stats: [
//         { value: "1000+", label: "Farmers Supported" },
//         { value: "20%", label: "Higher Profit" },
//         { value: "24/7", label: "AI Assistance" },
//       ],

//       feature1Title: "Farmer Friendly Design",
//       feature1Desc: "Simple UI, easy steps, no technical skills required.",

//       feature2Title: "Better Selling Price",
//       feature2Desc: "Avoid middlemen and get direct buyers.",

//       feature3Title: "Instant Crop Advice",
//       feature3Desc: "Get real-time suggestions based on crop & location.",
//     },
//   };

//   const t = text[language] || text.en;

//   return (
//     <div className="bg-gradient-to-b from-green-100 via-green-50 to-white">

//       {/* HERO */}
//       <section
//         className="relative min-h-[85vh] flex items-center justify-center text-center text-white"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 px-6 max-w-3xl"
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold">
//             {t.titleTop}
//           </h1>

//           <h2 className="text-5xl md:text-6xl font-extrabold text-green-300 mt-2">
//             {t.titleBottom}
//           </h2>

//           <p className="mt-6 text-lg text-gray-200">
//             {t.desc}
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

//             <Link
//               to="/login"
//               className="bg-green-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-green-700 shadow-xl"
//             >
//               🌾 {t.ctaPrimary}
//             </Link>

//             <Link
//               to="/signup"
//               className="bg-white/20 border border-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-white/30 backdrop-blur-md"
//             >
//               {t.ctaSecondary}
//             </Link>

//           </div>
//         </motion.div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-20 bg-green-50">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

//           {[
//             { title: t.feature1Title, desc: t.feature1Desc, icon: "🌱" },
//             { title: t.feature2Title, desc: t.feature2Desc, icon: "💰" },
//             { title: t.feature3Title, desc: t.feature3Desc, icon: "🤖" },
//           ].map((f, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               className="bg-white rounded-2xl p-8 shadow-lg text-center"
//             >
//               <div className="text-5xl mb-4">{f.icon}</div>
//               <h3 className="text-xl font-bold text-green-800">
//                 {f.title}
//               </h3>
//               <p className="text-gray-600 mt-2">{f.desc}</p>
//             </motion.div>
//           ))}

//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white text-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           className="max-w-3xl mx-auto px-6"
//         >
//           <h2 className="text-3xl font-bold mb-4">
//             Start Selling Smarter Today 🚀
//           </h2>

//           <p className="mb-6 text-gray-200">
//             Join AgroAI and connect directly with buyers to maximize your profit.
//           </p>

//           <Link
//             to="/signup"
//             className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
//           >
//             Get Started
//           </Link>
//         </motion.div>
//       </section>

//     </div>
//   );
// }

// export default Home;



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
        "An AI assistant helping farmers find the right buyers, better prices, and smarter selling decisions.",
      ctaPrimary: "Talk to AI",
      ctaSecondary: "Farmer Registration",
    },
  };

  const t = text[language] || text.en;

  return (
    <div className="bg-white">

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-green-900/40"></div>

        {/* Glow Effect */}
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            {t.titleTop}
          </h1>

          <h2 className="text-5xl md:text-7xl font-extrabold text-green-400 mt-2">
            {t.titleBottom}
          </h2>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            {t.desc}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              to="/login"
              className="bg-green-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-xl"
            >
              🌾 {t.ctaPrimary}
            </Link>

            <Link
              to="/signup"
              className="bg-white/20 border border-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-white/30 backdrop-blur-md transition"
            >
              {t.ctaSecondary}
            </Link>

          </div>

          {/* Trust Badge */}
          <p className="mt-6 text-sm text-gray-300">
            Trusted by farmers across Uttarakhand 🌾
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Farmer Friendly",
              desc: "Simple and easy to use, even for non-tech users.",
              icon: "🌱",
            },
            {
              title: "Better Profit",
              desc: "Sell directly and avoid middlemen losses.",
              icon: "💰",
            },
            {
              title: "AI Guidance",
              desc: "Smart suggestions for selling crops efficiently.",
              icon: "🤖",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center border hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-green-800">
                {f.title}
              </h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-green-700 to-green-900 text-white text-center relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-[100px] rounded-full top-[-100px] right-[-100px]"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-3xl mx-auto px-6 relative z-10"
        >
          <h2 className="text-4xl font-bold mb-4">
            Start Selling Smarter 🚀
          </h2>

          <p className="mb-6 text-gray-200">
            Join AgroAI and maximize your crop profits with AI-powered insights.
          </p>

          <Link
            to="/signup"
            className="bg-white text-green-700 px-10 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

    </div>
  );
}

export default Home;
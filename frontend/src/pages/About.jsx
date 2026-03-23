import { motion } from "framer-motion";

function About() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen px-6 py-16">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight"
        >
          🌾 Transforming Agriculture with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          AgroAI empowers farmers to make smarter crop selling decisions by providing real-time market insights, reducing dependency on middlemen, and maximizing profits.
        </motion.p>
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-10 border border-gray-100"
      >

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          <span className="font-semibold text-green-700">AgroAI</span> is an AI-powered Crop Selling Assistant designed for farmers in Uttarakhand (starting with Haldwani). It helps farmers discover the best markets, optimal selling time, and price insights through a simple conversational interface.
        </p>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {[
            {
              title: "📍 Smart Market Discovery",
              desc: "Find nearby mandis and buyers instantly based on crop and location.",
            },
            {
              title: "💰 Price Intelligence",
              desc: "Get expected price ranges to maximize profit and avoid losses.",
            },
            {
              title: "🤖 AI-Powered Chat",
              desc: "Ask questions in natural language and receive structured insights.",
            },
            {
              title: "⚡ Fast & Secure",
              desc: "Powered by high-speed AI APIs ensuring reliable responses.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.06 }}
              className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </motion.div>

      {/* STATS SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        {[
          { value: "100%", label: "Farmer Focused" },
          { value: "AI", label: "Powered Insights" },
          { value: "24/7", label: "Availability" },
          { value: "1+", label: "Cities (Expanding)" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold text-green-700">
              {stat.value}
            </h2>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* MISSION SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-3xl mx-auto mt-16 text-center"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          🚀 Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          To digitally empower farmers by providing intelligent tools that enhance decision-making, increase income, and bring transparency to agricultural markets.
        </p>
      </motion.div>

    </div>
  );
}

export default About;
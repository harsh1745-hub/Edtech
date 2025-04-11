import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaLightbulb, FaChartLine, FaBookReader, FaTrophy } from "react-icons/fa";

const features = [
  { id: 1, title: "AI-Powered Study Tools", icon: <FaRobot />, description: "Smart summarization, flashcards & mind maps." },
  { id: 2, title: "Personalized Learning", icon: <FaLightbulb />, description: "Adaptive learning paths based on your progress." },
  { id: 3, title: "Performance Analytics", icon: <FaChartLine />, description: "Track your learning journey with insights & stats." },
  { id: 4, title: "AI-Based Mock Tests", icon: <FaBookReader />, description: "Test yourself with AI-generated questions." },
  { id: 5, title: "Gamified Learning", icon: <FaTrophy />, description: "Earn badges & compete on leaderboards." },
];

const Features = () => {
  return (
    <section className="relative bg-[#F8FAFC] py-20 px-6 md:px-16 overflow-hidden">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center text-green-800 mb-16"
      >
        🚀 Key Features
      </motion.h2>

      {/* Glowing Pipeline Background */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-green-400 to-green-600 blur-md opacity-30"></div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            {/* Feature Icon */}
            <div className="bg-green-100 text-green-700 p-4 rounded-full shadow-md text-4xl">
              {feature.icon}
            </div>

            {/* Feature Content */}
            <h3 className="text-xl font-semibold text-green-900 mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>

            {/* Glowing Connector */}
            {index !== features.length - 1 && (
              <div className="absolute left-1/2 -bottom-10 w-[2px] h-12 bg-green-400"></div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;


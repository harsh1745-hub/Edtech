import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRocket, FaBrain } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-50 to-green-200 px-6">
      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-green-300/40 to-transparent rounded-b-full blur-3xl"
      ></motion.div>

      {/* Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-5xl sm:text-6xl font-extrabold text-green-900 drop-shadow-md"
      >
        AI-Powered Learning 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-4 text-lg sm:text-xl text-gray-800 px-4 sm:px-16"
      >
        Elevate your learning experience with AI-driven study tools and insights.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-6 flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/get-started"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-800 transition"
        >
          Get Started
        </Link>
        <Link
          to="/learn-more"
          className="bg-white border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 hover:text-white transition"
        >
          Learn More
        </Link>
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute top-20 left-10 text-green-500 text-4xl sm:text-6xl"
      >
        <FaBrain />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute bottom-20 right-10 text-green-500 text-4xl sm:text-6xl"
      >
        <FaRocket />
      </motion.div>
    </section>
  );
};

export default Hero;

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // Added for signup
    email: "",
    password: "",
  });

  // Toggle between Sign Up and Login
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" }); // Reset form
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp
        ? "https://edtech-f05f.onrender.com/user/register"
        : "https://edtech-f05f.onrender.com/user/login";

      // Prepare request data
      const requestData = isSignUp
        ? formData // Include name for signup
        : { email: formData.email, password: formData.password }; // Exclude name for login

      console.log("📤 Sending request to:", endpoint);
      console.log("📤 Request Data:", requestData);

      const response = await axios.post(endpoint, requestData, {
        withCredentials: true, // Allows cookies for authentication
      });

      console.log("✅ Response Data:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || "Something went wrong!"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          {isSignUp ? "Join EduGen" : "Welcome Back!"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Show Name Field only for Sign Up */}
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={toggleForm}
            className="text-pink-600 cursor-pointer hover:underline"
          >
            {isSignUp ? " Log In" : " Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

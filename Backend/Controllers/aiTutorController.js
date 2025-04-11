import asyncHandler from 'express-async-handler';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv'

dotenv.config()

const gemini = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

// ✅ Function to call Gemini AI
const callGeminiAPI = async (question) => {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(question);
    return response.response.text();
  } catch (error) {
    console.error("AI Processing Error:", error.message);
    throw new Error("Failed to generate AI response.");
  }
};

// ✅ AI Tutor Controller
export const askAI = asyncHandler(async (req, res) => {
  const { userId, question, context } = req.body;

  if (!userId || !question) {
    return res.status(400).json({ success: false, message: "User ID and question are required." });
  }

  const prompt = `You are an AI tutor. Answer this question clearly: ${question}. Context: ${context || "None"}`;
  const answer = await callGeminiAPI(prompt);

  res.status(200).json({ success: true, answer });
});
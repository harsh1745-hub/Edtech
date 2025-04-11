import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

export const genrateVideoSummary = async (text) => {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      summary: `Summarize this video transcript in simple terms (max 200 words):\n${text}`,
      flashcards: `Generate 5 flashcards (Q&A format) from this video:\n${text}. Provide JSON format only (no extra text): [{ "question": "...", "answer": "..." }]`,
      mindMap: `Create a structured JSON mind map from this video:\n${text}. Provide JSON format only (no extra text): { "main_topic": "...", "subtopics": [{ "title": "...", "details": "..." }] }`,
    };

    const [summary, flashcardsRaw, mindMapRaw] = await Promise.all([
      callGeminiAPI(model, prompts.summary),
      callGeminiAPI(model, prompts.flashcards),
      callGeminiAPI(model, prompts.mindMap),
    ]);

    return {
      summary,
      flashcards: parseJsonSafely(flashcardsRaw),
      mindMap: parseJsonSafely(mindMapRaw),
    };
  } catch (error) {
    console.error("AI Processing Error:", error.message);
    throw new Error("Failed to generate AI summary.");
  }
};

// ✅ Fixed API Call Function
const callGeminiAPI = async (model, prompt) => {
  const response = await model.generateContent(prompt);
  return response.response.text();
};

// ✅ Function to Clean & Parse AI Output Safely
const parseJsonSafely = (text) => {
  try {
    // Remove backticks & extra formatting
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
    return []; // Return empty array if parsing fails
  }
};


export const getNextRecommendedTopics = async (completedTopics) => {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Based on these completed topics: ${completedTopics.join(", ")}, 
    suggest the next 3 topics for learning in a structured JSON format:
    { "recommended_topics": ["Topic1", "Topic2", "Topic3"] }`;

    const response = await model.generateContent(prompt);
    return JSON.parse(response.response.text()).recommended_topics;
  } catch (error) {
    console.error("AI Recommendation Error:", error.message);
    return [];
  }
};


export const evaluateAssignment = async (text) => {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      evaluation: `Evaluate this assignment and provide constructive feedback:\n${text}`,
      score: `Rate this assignment out of 100:\n${text}`,
    };

    const [evaluation, score] = await Promise.all([
      callGeminiAPIS(model, prompts.evaluation),
      callGeminiAPIs(model, prompts.score),
    ]);

    return {
      evaluation,
      score: parseInt(score.match(/\d+/)?.[0] || "0"), // Extract numeric score
    };
  } catch (error) {
    console.error("AI Evaluation Error:", error.message);
    throw new Error("Failed to evaluate assignment.");
  }
};

const callGeminiAPIS = async (model, prompt) => {
  const response = await model.generateContent(prompt);
  return response.response.text();
};



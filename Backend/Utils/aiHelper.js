import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini AI
const gemini = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

export const generateAIContent = async (text) => {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define prompts for each type of content
    const prompts = {
      summary: `Summarize the following text in a concise and easy-to-understand manner (max 200 words):\n${text}`,
      flashcards: `Generate 5 flashcards (Q&A format) from the following content:\n${text}. Output in pure JSON format as:\n[{ "question": "...", "answer": "..." }]`,
      mindMap: `Create a structured JSON mind map from the following content:\n${text}. Output in pure JSON format as:\n{ "main_topic": "...", "subtopics": [{ "title": "...", "details": "..." }] }`,
    };

    const [summary, flashcards, mindMap] = await Promise.all([
      callGeminiAPI(model, prompts.summary),
      callGeminiAPI(model, prompts.flashcards),
      callGeminiAPI(model, prompts.mindMap),
    ]);

    // Parse JSON responses
    const parsedFlashcards = safeJsonParse(flashcards, "flashcards");
    const parsedMindMap = safeJsonParse(mindMap, "mindMap");

    return {
      summary,
      flashcards: parsedFlashcards,
      mindMap: parsedMindMap,
    };
  } catch (error) {
    console.error("AI Content Generation Error:", error.message);
    throw new Error("Failed to generate AI content.");
  }
};

const callGeminiAPI = async (model, prompt) => {
  try {
    const response = await model.generateContent(prompt);
    const textResponse = await response.response;
    return textResponse.candidates[0]?.content?.parts[0]?.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("AI request failed.");
  }
};

const safeJsonParse = (jsonString, context) => {
  try {
    // Remove triple backticks (if any)
    const cleanedString = jsonString.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedString);
  } catch (error) {
    console.error(`Failed to parse ${context}:`, jsonString); // Debug raw response
    throw new Error(`Invalid ${context} format.`);
  }
};

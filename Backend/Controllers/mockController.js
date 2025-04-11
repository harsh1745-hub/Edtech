import { GoogleGenerativeAI } from "@google/generative-ai";
import Mock from "../Models/mocktestModel.js";
import dotenv from 'dotenv'

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

export const generateMockTest = async (req, res) => {
    try {
      const { userId, topic, difficulty } = req.body;
  
      if (!userId || !topic || !difficulty) {
        return res.status(400).json({ success: false, message: "Missing fields" });
      }
  
      // AI Prompt for generating questions
      const prompt = `Generate a ${difficulty} level quiz with 5 MCQs on ${topic}. 
      Format: [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "...", "explanation": "..."}]`;
  
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent(prompt);
      const questions = JSON.parse(response.response.text());
  
      // Save test in DB
      const newTest = await Mock.create({ userId, questions, score: 0, accuracy: 0 });
  
      res.status(201).json({ success: true, test: newTest });
    } catch (error) {
      console.error("AI Mock Test Error:", error);
      res.status(500).json({ success: false, message: "Failed to generate test" });
    }
  };

  export const submitMockTest = async (req, res) => {
    try {
      const { testId, answers } = req.body;
  
      const test = await Mock.findById(testId);
      if (!test) return res.status(404).json({ success: false, message: "Test not found" });
  
      let correctCount = 0;
      test.questions.forEach((q, index) => {
        if (q.correctAnswer === answers[index]) correctCount++;
        q.userAnswer = answers[index];
      });
  
      test.score = correctCount;
      test.accuracy = (correctCount / test.questions.length) * 100;
      await test.save();
  
      res.status(200).json({ success: true, test });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to submit test" });
    }
  };
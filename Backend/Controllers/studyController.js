import StudyMaterial from "../Models/studyModel.js";
import { generateAIContent } from "../Utils/aiHelper.js";
import asyncHandler from "express-async-handler";
import logger from "../Utils/logger.js"; // Logging utility

// 📌 Generate & Save Study Material
export const generateStudyMaterial = asyncHandler(async (req, res) => {
  const { userId, title, content } = req.body;

  // Validate input
  if (!userId || !title || !content) {
    res.status(400);
    throw new Error("Missing required fields: userId, title, or content");
  }

  // Generate AI-based summary, flashcards, and mind map
  const { summary, flashcards, mindMap } = await generateAIContent(content);

  // Save to MongoDB
  const newMaterial = new StudyMaterial({
    userId,
    title,
    content,
    summary,
    flashcards,
    mindMap,
  });

  await newMaterial.save();

  // Log the creation of a new study material
  logger.info(`New study material created by user ${userId}: ${title}`);

  res.status(201).json({ success: true, material: newMaterial });
});

// 📌 Retrieve Saved Study Materials
export const getStudyMaterials = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId) {
    res.status(400);
    throw new Error("User ID is required");
  }

  // Fetch study materials for the user
  const materials = await StudyMaterial.find({ userId });

  // Log the retrieval of study materials
  logger.info(`Study materials retrieved for user ${userId}`);

  res.status(200).json({ success: true, materials });
});

// 📌 Update Study Material
export const updateStudyMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Validate input
  if (!id || (!title && !content)) {
    res.status(400);
    throw new Error("Missing required fields: id and at least one of title or content");
  }

  // Find the study material
  const material = await StudyMaterial.findById(id);
  if (!material) {
    res.status(404);
    throw new Error("Study material not found");
  }

  // Update fields if provided
  if (title) material.title = title;
  if (content) material.content = content;

  // Save the updated material
  await material.save();

  // Log the update
  logger.info(`Study material updated: ${id}`);

  res.status(200).json({ success: true, material });
});

// 📌 Delete Study Material
export const deleteStudyMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id) {
    res.status(400);
    throw new Error("Study material ID is required");
  }

  // Find and delete the study material
  const material = await StudyMaterial.findByIdAndDelete(id);
  if (!material) {
    res.status(404);
    throw new Error("Study material not found");
  }

  // Log the deletion
  logger.info(`Study material deleted: ${id}`);

  res.status(200).json({ success: true, message: "Study material deleted successfully" });
});
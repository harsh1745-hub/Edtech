import asyncHandler from 'express-async-handler'
import Leraning from '../Models/learningModel.js'
import { getNextRecommendedTopics } from '../Config/aiService.js'



// ✅ Get User's Learning Path
export const getLearningPath = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const progress = await Leraning.findOne({ userId });
  if (!progress) {
    return res.status(404).json({ success: false, message: "No progress found" });
  }

  res.json({ success: true, progress });
});

// ✅ Update Progress and Get Next Topics
export const updateProgress = asyncHandler(async (req, res) => {
  const { userId, completedTopic } = req.body;

  let progress = await Leraning.findOne({ userId });
  if (!progress) {
    progress = new LearningProgress({ userId, completedTopics: [], recommendedTopics: [] });
  }

  // Add completed topic
  if (!progress.completedTopics.includes(completedTopic)) {
    progress.completedTopics.push(completedTopic);
  }

  // Get AI-recommended topics
  const recommendedTopics = await getNextRecommendedTopics(progress.completedTopics);
  progress.recommendedTopics = recommendedTopics;

  await progress.save();
  res.json({ success: true, progress });
});

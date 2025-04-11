import asyncHandler from 'express-async-handler';
import Perfomance from '../Models/perfomanceModel.js';

export const getPerformanceStats = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const stats = await Perfomance.findOne({ userId });
  
    if (!stats) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
  
    res.status(200).json({ success: true, data: stats });
  });
  
 
  export const updatePerformanceStats = asyncHandler(async (req, res) => {
    const { userId, correct, incorrect, studyMinutes, topic } = req.body;
  
    let stats = await Perfomance.findOne({ userId });
  
    if (!stats) {
      stats = new performance({ userId });
    }
  
    // Update Stats
    stats.quizzesAttempted += correct + incorrect;
    stats.correctAnswers += correct;
    stats.incorrectAnswers += incorrect;
    stats.accuracy =
      stats.quizzesAttempted > 0
        ? (stats.correctAnswers / stats.quizzesAttempted) * 100
        : 0;
    stats.studyTime += studyMinutes;
    stats.lastActivity = new Date();
  
    // Update Weak Areas & Topics Mastered
    if (stats.accuracy > 80 && !stats.topicsMastered.includes(topic)) {
      stats.topicsMastered.push(topic);
    } else if (stats.accuracy < 50 && !stats.weakAreas.includes(topic)) {
      stats.weakAreas.push(topic);
    }
  
    await stats.save();
    res.status(200).json({ success: true, message: "Performance updated" });
  });
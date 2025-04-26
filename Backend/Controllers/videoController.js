import asyncHandler from 'express-async-handler';
import Video from '../Models/videoSummaryModel.js';
import { getYouTubeTranscript } from '../Utils/getYouTubeTranscript.js';
import { genrateVideoSummary } from '../Config/aiService.js';


const extractVideoId = (videoUrl) => {
  const regex = /(?:v=|\/embed\/|\/v\/|youtu\.be\/|\/shorts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/;
  const match = videoUrl.match(regex);
  return match ? match[1] : null;
};

// ✅ Controller: Summarize Video
export const summarizeVideo = asyncHandler(async (req, res) => {
  try {
    const { userId, videoUrl, title } = req.body;

    // 1. Validation
    if (!userId || !videoUrl || !title) {
      return res.status(400).json({ success: false, message: "Missing required fields: userId, videoUrl, title" });
    }

    // 2. Extract Video ID
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
    }

    console.log(`🎯 Extracted Video ID: ${videoId}`);

    // 3. Fetch Transcript
    const transcript = await getYouTubeTranscript(videoId);
    if (!transcript || transcript.length === 0) {
      return res.status(400).json({ success: false, message: "Failed to retrieve transcript. Video might not have captions." });
    }

    console.log(`📜 Transcript fetched successfully. Length: ${transcript.length} characters`);

    // 4. Generate Summary
    const { summary, flashcards, mindmap } = await generateVideoSummary(transcript);
    if (!summary) {
      return res.status(500).json({ success: false, message: "Failed to generate summary from transcript." });
    }

    console.log(`🧠 AI Summary generated. Preview: ${summary.slice(0, 100)}...`);

    // 5. Save to Database
    const newSummary = await Video.create({
      userId,
      videoUrl,
      title,
      summary,
      flashcards,
      mindmap,
    });

    console.log(`💾 New summary saved for userId: ${userId}`);

    res.status(201).json({ success: true, summary: newSummary });
  } catch (error) {
    console.error('❌ Error in summarizeVideo:', error.message);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
});

// ✅ Controller: Get User Summaries
export const getUserSummaries = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Validation
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // 2. Fetch summaries
    const summaries = await Video.find({ userId }).sort({ createdAt: -1 }); // Sort: newest first

    console.log(`📚 Found ${summaries.length} summaries for userId: ${userId}`);

    res.status(200).json({ success: true, summaries });
  } catch (error) {
    console.error('❌ Error in getUserSummaries:', error.message);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
});

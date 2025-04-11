import asyncHandler from 'express-async-handler';
import Video from '../Models/videoSummaryModel.js';
import { getYouTubeTranscript } from '../Utils/getYouTubeTranscript.js';
import { genrateVideoSummary } from '../Config/aiService.js';


const extractVideoId = (videoUrl) => {
    const match = videoUrl.match(/(?:v=|\/embed\/|\/v\/|youtu\.be\/|\/shorts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };
  
  // ✅ Summarize Video Controller
  export const summarizeVideo = asyncHandler(async (req, res) => {
    const { userId, videoUrl, title } = req.body;
  
    if (!userId || !videoUrl || !title) {
      return res.status(400).json({ success: false, message: "Missing required fields: userId, videoUrl, title" });
    }
  
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
    }
  
    // ✅ Fetch Transcript
    const transcript = await getYouTubeTranscript(videoId);
    if (!transcript) {
      return res.status(400).json({ success: false, message: "Failed to retrieve transcript" });
    }
  
    // ✅ Generate AI Summary
    const { summary, flashcards, mindmap } = await genrateVideoSummary(transcript);
  
    // ✅ Save to Database
    const newSummary = new Video({
      userId,
      videoUrl,
      title,
      summary,
      flashcards,
      mindmap,
    });
  
    await newSummary.save();
    res.status(201).json({ success: true, summary: newSummary });
  });
  
  // ✅ Get Summaries for a User
  export const getUserSummaries = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
  
    const summaries = await Video.find({ userId });
    res.status(200).json({ success: true, summaries });
  });
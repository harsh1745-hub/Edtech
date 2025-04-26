import asyncHandler from 'express-async-handler';
import Video from '../Models/videoSummaryModel.js';
import { getYouTubeTranscript } from '../Utils/getYouTubeTranscript.js';
import { genrateVideoSummary } from '../Config/aiService.js';
import YoutubeTranscript from 'youtube-transcript';


const extractVideoId = (videoUrl) => {
  try {
    // Handle case where URL is already just an ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(videoUrl)) return videoUrl;
    
    const regex = /(?:v=|\/embed\/|\/v\/|youtu\.be\/|\/shorts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Video ID extraction error:', error);
    return null;
  }
};

// 🚀 CAPTCHA-Proof Transcript Fetcher
const getYouTubeTranscript = async (videoId) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      retry: 3, // Auto-retry on failure
      delay: 1000 // Delay between retries
    });
    
    return transcript.map(item => item.text).join(' ');
  } catch (error) {
    console.error('Transcript fetch error:', error.message);
    
    // Special handling for CAPTCHA errors
    if (error.message.includes('CAPTCHA') || error.message.includes('continue')) {
      throw new Error('YouTube is requiring CAPTCHA verification. Please try again later.');
    }
    
    return null;
  }
};

// 🎯 Controller: Summarize Video
export const summarizeVideo = asyncHandler(async (req, res) => {
  const { userId, videoUrl, title } = req.body;

  // 1. Enhanced Validation
  if (!userId || !videoUrl || !title) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields",
      required: ["userId", "videoUrl", "title"]
    });
  }

  // 2. Video ID Extraction with better error handling
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid YouTube URL or ID",
      example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    });
  }

  console.log(`🎯 Extracted Video ID: ${videoId}`);

  // 3. Transcript Fetching with CAPTCHA handling
  let transcript;
  try {
    transcript = await getYouTubeTranscript(videoId);
    if (!transcript) {
      return res.status(400).json({ 
        success: false, 
        message: "Transcript unavailable. Video may not have captions or is restricted.",
        solutions: [
          "Try a different video",
          "Check if captions are available",
          "Try again later if CAPTCHA appears"
        ]
      });
    }
  } catch (error) {
    return res.status(429).json({ // 429 = Too Many Requests
      success: false,
      message: error.message,
      solution: "Wait a few minutes before trying again"
    });
  }

  console.log(`📜 Transcript fetched (${transcript.length} chars)`);

  // 4. Summary Generation with timeout
  try {
    const { summary, flashcards, mindmap } = await Promise.race([
      generateVideoSummary(transcript),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Summary generation timeout')), 30000)
    ]);

    if (!summary) {
      throw new Error('Empty summary generated');
    }

    console.log(`🧠 Generated summary (${summary.length} chars)`);

    // 5. Database Save with duplicate prevention
    const existing = await Video.findOne({ userId, videoId });
    if (existing) {
      return res.status(409).json({ 
        success: false, 
        message: "Summary already exists for this video",
        existingSummaryId: existing._id
      });
    }

    const newSummary = await Video.create({
      userId,
      videoId, // Store ID separately for easier queries
      videoUrl,
      title,
      summary,
      flashcards,
      mindmap,
    });

    return res.status(201).json({ 
      success: true, 
      summary: {
        id: newSummary._id,
        title: newSummary.title,
        preview: summary.slice(0, 100) + '...',
        createdAt: newSummary.createdAt
      }
    });

  } catch (error) {
    console.error('Summary generation error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Processing failed: " + error.message,
      stage: "summary-generation"
    });
  }
});

// 📚 Controller: Get User Summaries
export const getUserSummaries = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid user ID format" 
    });
  }

  try {
    const summaries = await Video.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v -flashcards -mindmap'); // Exclude heavy fields

    if (!summaries.length) {
      return res.status(404).json({ 
        success: true, 
        message: "No summaries found",
        action: "Try creating your first summary"
      });
    }

    return res.status(200).json({
      success: true,
      count: summaries.length,
      summaries: summaries.map(s => ({
        id: s._id,
        title: s.title,
        videoUrl: s.videoUrl,
        preview: s.summary.slice(0, 50) + '...',
        createdAt: s.createdAt
      }))
    });

  } catch (error) {
    console.error('Database query error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve summaries",
      error: error.message 
    });
  }
});

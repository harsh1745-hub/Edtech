import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const YOUTUBE_KEY = process.env.YOUTUBE_API_KEY;

export const getYouTubeTranscript = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${YOUTUBE_KEY}`
    );
    if (!response.data.items.length) {
      throw new Error("No subtitles available for this video.");
    }
    const transcriptUrl = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en`;
    const transcriptResponse = await axios.get(transcriptUrl);
    return transcriptResponse.data;
  } catch (error) {
    console.error("YouTube Transcript Error:", error.message);
    throw new Error("Failed to fetch YouTube transcript.");
  }
};

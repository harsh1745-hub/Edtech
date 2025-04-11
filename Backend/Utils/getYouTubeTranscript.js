import { YoutubeTranscript } from "youtube-transcript";

export const getYouTubeTranscript = async (videoId) => {
  try {
    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);

    // Convert transcript array into a single string
    const transcriptText = transcriptData.map((entry) => entry.text).join(" ");
    
    return transcriptText;
  } catch (error) {
    console.error("Error fetching YouTube transcript:", error.message);
    return null; // Return null if transcript fetch fails
  }
};

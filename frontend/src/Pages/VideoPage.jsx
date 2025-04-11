import React from "react";
import VideoSummaryForm from "../Components/VideoSummaryForm";
import UserSummaries from "../Components/UserSummary";

const VideoSummarizerPage = () => {
    // ✅ Hardcoded userId (or get from your auth context if available)
    const userId = "6612e8cc9f1a4c5b3f3de71a"; // Replace with actual user ID
  
    return (
      <div className="bg-gray-100 min-h-screen py-10">
        <VideoSummaryForm userId={userId} />
        <hr className="my-10 border-t" />
        <UserSummaries userId={userId} />
      </div>
    );
  };
  
  export default VideoSummarizerPage;
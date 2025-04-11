import React from "react";
import { useState,useEffect } from "react";
import api from "../API/videoapi";

const UserSummaries = ({ userId }) => {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSummaries = async () => {
        try {
          const res = await api.get(`/video/${userId}`);
          setSummaries(res.data.summaries);
        } catch (err) {
          console.error("Error fetching summaries:", err.response?.data || err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (userId) {
        fetchSummaries();
      }
    }, [userId]);
  
    if (loading) return <p className="text-center mt-4">Loading summaries...</p>;
  
    if (summaries.length === 0) return <p className="text-center mt-4">No summaries found.</p>;
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">📚 Your Summarized Videos</h2>
        <div className="space-y-4">
          {summaries.map((video) => (
            <div key={video._id} className="bg-white border rounded p-4 shadow-sm">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="mb-2 text-sm text-gray-500">{video.videoUrl}</p>
              <p><strong>Summary:</strong> {video.summary}</p>
              <p><strong>Flashcards:</strong> {JSON.stringify(video.flashcards)}</p>
              <p><strong>Mind Map:</strong> {JSON.stringify(video.mindmap)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default UserSummaries;
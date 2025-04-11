import React, { useState } from "react";
import { FiClipboard, FiCheckCircle } from "react-icons/fi";
import api from "../API/videoapi";

const VideoSummaryForm = ({ userId }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  const handleSubmit = async () => {
    if (!videoUrl || !title) {
      alert("Please enter both video title and URL");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/video/summarize", { userId, videoUrl, title });
      setResult(res.data.summary);
      setVideoUrl("");
      setTitle("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        📽️ YouTube Video Summarizer
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste YouTube video URL"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full text-white font-semibold py-3 rounded-md transition duration-200 ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "⏳ Summarizing..." : "✨ Generate Summary"}
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4">✅ {result.title}</h3>

          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium mb-1">📝 Summary:</p>
            <p className="text-gray-700 bg-white p-3 rounded border">{result.summary}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500 font-medium">📇 Flashcards:</p>
              <button
                onClick={() => handleCopy(JSON.stringify(result.flashcards, null, 2), "flashcards")}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                {copied === "flashcards" ? <FiCheckCircle /> : <FiClipboard />}
                {copied === "flashcards" ? "Copied!" : "Copy"}
              </button>
            </div>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {result.flashcards?.map((card, idx) => <li key={idx}>{card}</li>)}
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500 font-medium">🧠 Mind Map:</p>
              <button
                onClick={() => handleCopy(JSON.stringify(result.mindmap, null, 2), "mindmap")}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                {copied === "mindmap" ? <FiCheckCircle /> : <FiClipboard />}
                {copied === "mindmap" ? "Copied!" : "Copy"}
              </button>
            </div>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {result.mindmap?.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSummaryForm;

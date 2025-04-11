import React, { useState } from "react";
import api from "../API/api";
import { useAuth } from "../Contexts/AuthContext";

const StudyMaterialGenerator = () => {
  const { user } = useAuth(); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!user?._id || !title || !content) return;

    setLoading(true);
    try {
      const res = await api.post("/generate", {
        userId: user._id, 
        title,
        content,
      });
      setResult(res.data.material);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border mb-4">
      <h2 className="text-xl font-bold mb-2">🧠 Generate Study Material</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title"
        className="w-full p-2 mb-2 border"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        placeholder="Paste content here..."
        className="w-full p-2 mb-2 border"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div className="mt-4 p-3 border bg-gray-100 rounded">
          <h3 className="font-bold">✅ Generated: {result.title}</h3>
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Flashcards:</strong> {JSON.stringify(result.flashcards)}</p>
          <p><strong>Mind Map:</strong> {JSON.stringify(result.mindMap)}</p>
        </div>
      )}
    </div>
  );
};

export default StudyMaterialGenerator;

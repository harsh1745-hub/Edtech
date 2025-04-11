import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

const UploadAssignment = () => {
  const { user } = useAuth();
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!textContent) return alert("Please enter assignment content");

    const formData = new FormData();
    formData.append("userId", user._id); // or user.id
    formData.append("textContent", textContent);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/assignment/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage("✅ Assignment submitted successfully!");
      setTextContent("");
      setFile(null);
    } catch (err) {
      setMessage("❌ Failed to submit assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📤 Upload Assignment</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <textarea
          rows="6"
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your assignment text here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input file-input-bordered w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>
      </form>

      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
};

export default UploadAssignment;

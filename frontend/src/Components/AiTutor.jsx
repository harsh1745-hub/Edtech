import React, { useState } from "react";
import api from "../API/videoapi";
import { useAuth } from "../Contexts/AuthContext"; 

const AITutor = () => {
  const { user } = useAuth(); // get user from context
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question.trim() || !user?._id) return;

    setLoading(true);
    try {
      const res = await api.post("/question/ask", {
        userId: user._id,
        question,
        context,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("❌ Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-4">🤖 Ask the AI Tutor</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question..."
        className="w-full p-3 border mb-4 rounded"
      />

      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Optional context (e.g. topic, background info)"
        className="w-full p-3 border mb-4 rounded"
        rows={4}
      />

      <button
        onClick={handleAsk}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-inner">
          <h3 className="font-bold mb-2">📘 AI's Answer:</h3>
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AITutor;

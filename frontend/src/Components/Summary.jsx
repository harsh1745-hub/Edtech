import React from "react";
import PdfExporter from "./PdfExporter";

const Summary = ({ inputText }) => {
  const handleGenerate = () => {
    // Call AI API for summarization (implement backend logic)
    console.log("Generating summary for:", inputText);
  };

  return (
    <div className="mt-4">
      <button onClick={handleGenerate} className="px-4 py-2 bg-green-500 text-white rounded-md">
        Generate Summary
      </button>
      
      {/* Example summary result (Replace with API output) */}
      <div className="mt-4 p-4 border rounded-md">
        <h3 className="text-lg font-semibold">Generated Summary</h3>
        <p>This is an AI-generated summary...</p>
      </div>

      {/* PDF Export */}
      <PdfExporter content="This is an AI-generated summary..." filename="summary.pdf" />
    </div>
  );
};

export default Summary;


import React from "react";
import PdfExporter from "./PdfExporter";

const Flashcards = ({ inputText }) => {
  return (
    <div className="mt-4">
      <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">Generate Flashcards</button>

      <div className="mt-4 p-4 border rounded-md">
        <h3 className="text-lg font-semibold">Generated Flashcards</h3>
        <ul>
          <li>Q1: What is AI? - Answer: AI is...</li>
          <li>Q2: What is ML? - Answer: ML is...</li>
        </ul>
      </div>

      <PdfExporter content="Generated Flashcards" filename="flashcards.pdf" />
    </div>
  );
};

export default Flashcards;

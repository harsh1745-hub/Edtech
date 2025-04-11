import React from "react";
import PdfExporter from "./PdfExporter";

const MindMaps = ({ inputText }) => {
  return (
    <div className="mt-4">
      <button className="px-4 py-2 bg-purple-500 text-white rounded-md">Generate Mind Map</button>

      <div className="mt-4 p-4 border rounded-md">
        <h3 className="text-lg font-semibold">Generated Mind Map</h3>
        <p>[Mind Map Visualization Here]</p>
      </div>

      <PdfExporter content="Generated Mind Map" filename="mindmap.pdf" />
    </div>
  );
};

export default MindMaps;

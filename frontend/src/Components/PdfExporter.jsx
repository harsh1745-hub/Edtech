import React from "react";
import { jsPDF } from "jspdf";

const PdfExporter = ({ content, filename }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(filename);
  };

  return (
    <button onClick={exportToPDF} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
      Export as PDF
    </button>
  );
};

export default PdfExporter;

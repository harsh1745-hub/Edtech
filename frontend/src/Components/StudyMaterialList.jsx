import React from "react";
import { useState,useEffect } from "react";
import api from "../API/api";

const StudyMaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const userId = "6612e8cc9f1a4c5b3f3de71a"; // Replace with actual user ID

  const loadMaterials = async () => {
    try {
      const res = await api.get(`/${userId}`);
      setMaterials(res.data.materials);
    } catch (err) {
      console.error("Error fetching materials", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error deleting material", err);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div className="p-4 border">
      <h2 className="text-xl font-bold mb-2">📚 Your Study Materials</h2>
      {materials.map((material) => (
        <div key={material._id} className="border p-3 mb-2 bg-gray-50 rounded">
          <h3 className="font-semibold">{material.title}</h3>
          <p className="text-sm text-gray-600">{material.summary?.slice(0, 100)}...</p>
          <div className="mt-2">
            <button
              className="text-red-600 mr-4"
              onClick={() => handleDelete(material._id)}
            >
              Delete
            </button>
            {/* Update button can be added here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyMaterialList;

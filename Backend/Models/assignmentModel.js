import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String, required: false }, 
  textContent: { type: String, required: true }, 
  evaluation: { type: String },
  score: { type: Number }, 
  feedback: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);
export default Assignment;

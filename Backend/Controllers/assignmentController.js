import Assignment from "../Models/assignmentModel.js";
import { evaluateAssignment } from "../Config/aiService.js";
import asyncHandler from 'express-async-handler'

export const uploadAssignment = asyncHandler(async (req, res) => {
    const { userId, textContent } = req.body;
    
    if (!userId || !textContent) {
      res.status(400);
      throw new Error("Missing required fields");
    }
  
    // ✅ AI Evaluation
    const { evaluation, score } = await evaluateAssignment(textContent);
  
    // ✅ Save to DB
    const newAssignment = new Assignment({
      userId,
      fileUrl: req.file ? req.file.path : null, // If file uploaded
      textContent,
      evaluation,
      score,
    });
  
    await newAssignment.save();
    res.status(201).json({ success: true, assignment: newAssignment });
  });
  
  // 📌 Get User Assignments
  export const getUserAssignments = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const assignments = await Assignment.find({ userId });
  
    res.status(200).json({ success: true, assignments });
  });
import express from 'express'
import { getLearningPath,updateProgress } from '../Controllers/learningController.js'

const router=express.Router();

router.get("/:userId", getLearningPath);
router.post("/update", updateProgress);

export default router;
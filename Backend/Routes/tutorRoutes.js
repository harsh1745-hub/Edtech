import express from 'express'
import { askAI } from "../Controllers/aiTutorController.js";

const router=express.Router();

router.post('/ask',askAI)

export default router;
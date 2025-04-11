import express from 'express'
import { summarizeVideo,getUserSummaries } from '../Controllers/videoController.js'

const router=express.Router();

router.post('/summarize',summarizeVideo);
router.get('/:userId',getUserSummaries);

export default router;
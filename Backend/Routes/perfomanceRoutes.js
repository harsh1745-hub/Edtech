import express from 'express'
import { getPerformanceStats,updatePerformanceStats } from '../Controllers/perfomanceController.js'

const router=express.Router();

router.get("/:userId",  getPerformanceStats);
router.post("/update",  updatePerformanceStats);

export default router;
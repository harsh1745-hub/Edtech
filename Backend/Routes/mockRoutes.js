import express from 'express'
import { generateMockTest,submitMockTest } from '../Controllers/mockController.js'

const router=express.Router();

router.post('/genrate',generateMockTest);
router.post('/submit',submitMockTest);

export default router;
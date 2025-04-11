import express from 'express'
import multer from 'multer'
import { uploadAssignment,getUserAssignments } from '../Controllers/assignmentController.js'


const router=express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadAssignment);
router.get("/:userId", getUserAssignments);

export default router;
import express from "express"
import { generateStudyMaterial,getStudyMaterials,updateStudyMaterial,deleteStudyMaterial } from "../Controllers/studyController.js"

const router=express.Router();

router.post('/generate',generateStudyMaterial);
router.get("/:userId", getStudyMaterials);
router.put("/:id", updateStudyMaterial);
router.delete("/:id", deleteStudyMaterial);

export default router
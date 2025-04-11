import express from 'express'
import { registerUser,loginUser,getUserProfile,deleteUserProfile,updateUserProfile, logout } from "../Controllers/userController.js";
import { protect } from '../Middelwares/authMiddelware.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/profile',protect,getUserProfile);
router.put('/profile',updateUserProfile);
router.delete('/profile',deleteUserProfile);

export default router;
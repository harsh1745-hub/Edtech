import express from 'express'
import { getAllBadges,assignBadgeToUser,getUserBadges } from '../Controllers/badgeController.js'

const router=express.Router();

router.get("/", getAllBadges); // Get all badges
router.post("/assign", assignBadgeToUser); // Assign badge to user
router.get("/:userId", getUserBadges); // Get earned badges of a user

export default router;
import asyncHandler from 'express-async-handler'
import UserBadge from '../Models/userBadgeModel.js'
import Badge from '../Models/badgeModel.js'

// 📌 Get All Badges
export const getAllBadges = asyncHandler(async (req, res) => {
    const badges = await Badge.find();
    res.status(200).json({ success: true, badges });
  });
  
  // 📌 Assign Badge to User
  export const assignBadgeToUser = asyncHandler(async (req, res) => {
    const { userId, badgeId } = req.body;
  
    const userBadge = await UserBadge.findOne({ userId, badgeId });
  
    if (userBadge) {
      return res.status(400).json({ success: false, message: "Badge already earned" });
    }
  
    const newUserBadge = new UserBadge({ userId, badgeId });
    await newUserBadge.save();
  
    res.status(201).json({ success: true, message: "Badge awarded!" });
  });
  
  // 📌 Get User's Earned Badges
  export const getUserBadges = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userBadges = await UserBadge.find({ userId }).populate("badgeId");
  
    res.status(200).json({ success: true, badges: userBadges });
  });
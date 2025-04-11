import mongoose from "mongoose";


const userBadgeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    badgeId: { type: mongoose.Schema.Types.ObjectId, ref: "Badge", required: true },
    earnedAt: { type: Date, default: Date.now }, // When the badge was earned
  });
  
  const UserBadge = mongoose.model("UserBadge", userBadgeSchema);
  
  export default UserBadge;
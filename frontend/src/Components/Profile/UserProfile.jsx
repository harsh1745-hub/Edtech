import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userId = "12345"; // Replace with real user ID (from authentication)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/profile/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4"
    >
      {/* Avatar */}
      <img
        src={user.avatar || "https://api.dicebear.com/6.x/adventurer/svg"}
        alt="User Avatar"
        className="w-24 h-24 rounded-full border-4 border-green-400"
      />

      {/* Name & Email */}
      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-sm text-gray-500">{user.email}</p>

      {/* Stats Section */}
      <div className="flex justify-between w-full px-6 py-4 bg-green-100 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600">Courses</h3>
          <p className="text-xl font-bold">{user.stats.completedCourses}</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600">Points</h3>
          <p className="text-xl font-bold">{user.stats.points}</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600">Rank</h3>
          <p className="text-xl font-bold">#{user.stats.rank}</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800">Badges</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.badges.length > 0 ? (
            user.badges.map((badge, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-green-200 px-3 py-1 rounded-full text-sm text-green-700 font-semibold"
              >
                {badge}
              </motion.span>
            ))
          ) : (
            <p className="text-gray-500">No badges yet</p>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
      >
        Edit Profile
      </motion.button>
    </motion.div>
  );
};

export default UserProfile;

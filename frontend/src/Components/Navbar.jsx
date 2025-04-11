import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const toggleProfile = useCallback(() => setProfileOpen((prev) => !prev), []);
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "MATERIAL", path: "/study" },
    { name: "VIDEO", path: "/video" },
    { name: "DASHBOARD", path: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-primary shadow-lg text-textSecondary p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center">
          🚀 EduGenie
        </Link>

        <div className="hidden md:flex space-x-6 text-lg">
          {navLinks.map((link) => (
            <NavItem key={link.name} name={link.name} path={link.path} closeMenu={closeAll} />
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <ProfileDropdown user={user} profileOpen={profileOpen} toggleProfile={toggleProfile} logout={logout} />
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 bg-secondary rounded-lg hover:bg-opacity-80 transition">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-80 transition">
                Signup
              </Link>
            </div>
          )}
          <button className="md:hidden text-3xl focus:outline-none" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu navLinks={navLinks} closeMenu={closeAll} user={user} logout={logout} />}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ name, path, closeMenu }) => (
  <Link to={path} className="relative group" onClick={closeMenu}>
    {name}
    <span className="absolute left-0 bottom-0 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const ProfileDropdown = ({ user, profileOpen, toggleProfile, logout }) => (
  <div className="relative">
    <button
      onClick={toggleProfile}
      className="flex items-center bg-secondary px-4 py-2 rounded-full hover:bg-textPrimary transition"
    >
      <span className="mr-2">{user?.name || "User"}</span>
      <img
        src={user?.profilePic || "/default-avatar.png"}
        alt="Profile"
        className="w-8 h-8 rounded-full border"
      />
    </button>
    <AnimatePresence>
      {profileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white text-textPrimary shadow-lg rounded-md overflow-hidden"
        >
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200" onClick={toggleProfile}>
            Profile
          </Link>
          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200" onClick={toggleProfile}>
            Settings
          </Link>
          <button onClick={logout} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const MobileMenu = ({ navLinks, closeMenu, user, logout }) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    className="fixed top-0 right-0 w-3/4 h-full bg-secondary p-6 flex flex-col text-lg"
  >
    <button className="text-3xl self-end mb-6 focus:outline-none" onClick={closeMenu}>
      ✖
    </button>

    {navLinks.map((link) => (
      <NavItem key={link.name} name={link.name} path={link.path} closeMenu={closeMenu} />
    ))}

    {user ? (
      <div className="mt-6">
        <p className="text-center font-semibold">{user.name}</p>
        <button onClick={logout} className="block w-full mt-4 bg-red-500 text-white py-2 rounded-lg">
          Logout
        </button>
      </div>
    ) : (
      <div className="flex flex-col space-y-4 mt-6">
        <Link to="/login" className="text-center px-4 py-2 bg-secondary rounded-lg hover:bg-opacity-80 transition" onClick={closeMenu}>
          Login
        </Link>
        <Link to="/signup" className="text-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-80 transition" onClick={closeMenu}>
          Signup
        </Link>
      </div>
    )}
  </motion.div>
);

export default Navbar


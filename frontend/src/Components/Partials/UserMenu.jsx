import { RiLogoutBoxRLine, RiSchoolLine, RiUserLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/authAction";

function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(dispatch, navigate);
  };

  return (
    <>
      <div
        className="w-5 h-5 bg-zinc-100 absolute -top-[0.7rem] right-[1%]"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
      ></div>
      <div className="w-[13rem] bg-zinc-100 absolute right-[1%] top-[100%] rounded-xl p-5 text-[#161616]">
        <Link
          to={"/profile"}
          className="flex gap-4 hover:-translate-y-1 transition-all duration-[.3s] ease-in-out"
        >
          <RiUserLine size={20} color="#161616" /> Your Profile
        </Link>
        <hr className="border-zinc-400 border-[.7px] my-3" />
        
        {/* Uncomment if needed */}
        {/* <Link
          to={"/university"}
          className="flex gap-4 hover:-translate-y-1 transition-all duration-[.3s] ease-in-out"
        >
          <RiSchoolLine size={20} color="#161616" /> Your University
        </Link>
        <hr className="border-zinc-400 border-[.7px] my-3" /> */}
        
        <button
          onClick={handleLogout}
          className="flex w-full text-left gap-4 hover:-translate-y-1 transition-all duration-[.3s] ease-in-out text-[#161616]"
        >
          <RiLogoutBoxRLine size={20} color="#161616" /> Logout
        </button>
      </div>
    </>
  );
}

export default UserMenu;

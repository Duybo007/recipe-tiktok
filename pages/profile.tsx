import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaPlateWheat } from "react-icons/fa6";
import { TbSalt } from "react-icons/tb";
import Cuisines from "@/components/Cuisines";
import Pantry from "@/components/Pantry";

function Profile() {
  const { logOut, user } = useAuth();
  const [openTab, setOpenTab] = useState("settings");

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 min-h-screen relative overflow-hidden">
      <div className="text-xl text-white text-center pb-3">Settings</div>
      <div className="pt-5 flex flex-col gap-3">
        <div
          onClick={() => setOpenTab("cuisines")}
          className="bg-[#2B2B2B] flex justify-between items-center py-3 px-2 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <FaPlateWheat className="text-primary w-7 h-7" />
            <div className="text-white font-bold">Cuisines</div>
          </div>
          <MdOutlineKeyboardArrowRight className="text-white w-7 h-7" />
        </div>
        {user && (
          <>
            <div
              onClick={() => setOpenTab("pantry")}
              className="bg-[#2B2B2B] flex justify-between items-center py-3 px-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <TbSalt className="text-primary w-7 h-7" />
                <div className="text-white font-bold">Pantry</div>
              </div>
              <MdOutlineKeyboardArrowRight className="text-white w-7 h-7" />
            </div>
            <div
              onClick={handleSignOut}
              className="bg-[#2B2B2B] flex justify-between items-center py-3 px-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <RiLogoutCircleFill className="text-primary w-7 h-7" />
                <div className="text-white font-bold">Sign Out</div>
              </div>
              <MdOutlineKeyboardArrowRight className="text-white w-7 h-7" />
            </div>
          </>
        )}
      </div>
      <Cuisines openTab={openTab} setOpenTab={setOpenTab} />
      {user && <Pantry openTab={openTab} setOpenTab={setOpenTab} />}
    </div>
  );
}

export default Profile;

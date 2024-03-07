import CuisineImg from "@/components/CuisineImg";
import { cuisines } from "@/constants/cuisines";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

function Cuisines({ openTab, setOpenTab }) {
  const { setStateCuisine, cuisine, setStatecurrentViewing } = useAuth();
  const [selectedCuisine, setSelectedCuisine] = useState(cuisine);

  const OnSelectCuisine = (cuisine: any) => {
    setStateCuisine(cuisine);
    setSelectedCuisine(cuisine);
    localStorage.removeItem("recipes");
    setStatecurrentViewing(0);
  };
  return (
    <div
      className={`p-4 duration-300 ease-out transition-all absolute inset-0 bg-dark overflow-scroll ${
        openTab === "cuisines"
          ? ""
          : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between pb-3">
        <MdOutlineKeyboardArrowLeft onClick={()=>setOpenTab("settings")} className="text-white w-10 h-10"/>
        <div className="text-3xl text-white text-center ">
          Pick a cuisine
        </div>
        <div></div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center pb-24 ">
        {cuisines.map((cuisine) => (
          <CuisineImg
            key={cuisine.value}
            cuisine={cuisine}
            onSelect={OnSelectCuisine}
            selectedCuisine={selectedCuisine}
          />
        ))}
      </div>
    </div>
  );
}

export default Cuisines;

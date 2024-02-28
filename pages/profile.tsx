import { cuisines } from "@/constants/cuisines";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

function Profile() {
  const { setStateCuisine, cuisine, setStatecurrentViewing } = useAuth();
  const [selectCuisine, setSelectCuisine] = useState(cuisine);

  const OnSelectCuisine = (cuisine: any) => {
    setStateCuisine(cuisine);
    setSelectCuisine(cuisine);
    localStorage.removeItem("recipes");
    setStatecurrentViewing(0);
  };
  return (
    <div className="p-4">
      <div className="text-4xl text-white text-center pb-3">Pick a cuisine</div>
      <div className="flex flex-wrap gap-4 justify-center pb-24">
        {cuisines.map((cuisine) => (
          <div
            key={cuisine.value}
            onClick={() => OnSelectCuisine(cuisine.value)}
            className={`${
              selectCuisine == cuisine.value && "border-4 border-primary"
            }  flex justify-center items-center w-40 h-36  rounded-md text-white font-bold bg-center bg-cover bg-[url('../assets/africa.jpg')] relative`}
          >
            <div className="absolute top-0 left-0 bg-black/[0.4] w-full h-full"></div>
            <div className="z-10 text-lg">{cuisine.display}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;

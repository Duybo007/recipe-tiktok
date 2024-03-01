import CuisineImg from "@/components/CuisineImg";
import { cuisines } from "@/constants/cuisines";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

function Profile() {
  const { setStateCuisine, cuisine, setStatecurrentViewing } = useAuth();
  const [selectedCuisine, setSelectedCuisine] = useState(cuisine);

  const OnSelectCuisine = (cuisine: any) => {
    setStateCuisine(cuisine);
    setSelectedCuisine(cuisine);
    localStorage.removeItem("recipes");
    setStatecurrentViewing(0);
  };
  return (
    <div className="p-4">
      <div className="text-4xl text-white text-center pb-3">Pick a cuisine</div>
      <div className="flex flex-wrap gap-4 justify-center pb-24">
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

export default Profile;

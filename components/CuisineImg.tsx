import React from "react";

function CuisineImg({ cuisine, onSelect, selectedCuisine }) {
  return (
    <div
      key={cuisine.value}
      onClick={() => onSelect(cuisine.value)}
      style={{
        backgroundImage: `url(${cuisine.bg})`,
      }}
      className={`${
        selectedCuisine == cuisine.value && "border-4 border-primary"
      }  flex justify-center items-center w-40 h-36 rounded-lg overflow-hidden text-white font-bold bg-center relative ${
        cuisine.bg
      } bg-cover`}
    >
      <img
        src={cuisine.imgUrl}
        alt="cuisine"
        role="presentation"
        className="w-full h-full absolute top-0 left-0 object-cover "
      />
      <div className="absolute top-0 left-0 bg-black/[0.4] w-full h-full"></div>
      <div className="z-10 text-lg">{cuisine.display}</div>
    </div>
  );
}

export default CuisineImg;

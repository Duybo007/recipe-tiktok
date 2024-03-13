import SavedRecipeCard from "@/components/SavedRecipeCard";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { getSearchRecipes } from "@/services/RecipeService";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setloading] = useState(false);

  const onSearch = async (e) => {
    if (e.key == "Enter") {
      setloading(true);
      const res = await getSearchRecipes(searchTerm, offset);

      setRecipes(res);
      setloading(false);
    }
  };

  const seeMoreRecipes = async () => {
    const newOffset = offset + 8;
    setOffset((prevOffset) => prevOffset + 8);
    const res = await getSearchRecipes(searchTerm, newOffset);
    setRecipes((prevState) => [...prevState, ...res]);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen p-4 bg-[url('https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center text-white">
      <div className=" bg-black">
        <div className="flex gap-2 items-center">
          <FaHeart className="text-white" />
          <div className="text-white text-xl font-semibold">
            Let&apos;s Cook
          </div>
        </div>
        <div className="flex items-center pl-3 bg-light-gray rounded-full mt-3 border-2 border-black">
          <FaSearch className="text-white " />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => onSearch(e)}
            className=" w-full py-2 px-2 rounded-full bg-light-gray focus:outline-none text-white"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 flex-wrap mt-4">
        {recipes.map((recipe: any) => (
          <SavedRecipeCard
            recipe={recipe}
            key={`${recipe.title}+${recipe.id}`}
            isSaving={true}
          />
        ))}
      </div>
      {recipes.length > 0 && (
        <div
          className="text-primary text-center font-bold pb-20 text-xl"
          onClick={seeMoreRecipes}
        >
          + See More
        </div>
      )}
    </div>
  );
}

export default Search;

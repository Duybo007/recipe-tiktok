import SavedRecipeCard from "@/components/SavedRecipeCard";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";

function useDebounceSearchTerm(value, time = 500) {
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(value);

  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearchTerm(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceSearchTerm;
}

function Saved() {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [savedRecipesFilter, setSavedRecipesFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debounce = useDebounceSearchTerm(searchTerm);
  const router = useRouter()

  useEffect(() => {
    if(!user){
      router.push('/')
    }
  }, [user])

  useEffect(() => {
    if (debounce === "") {
      setSavedRecipesFilter(savedRecipes);
      return;
    }
    setSavedRecipesFilter(
      savedRecipes.filter((ingredient) => {
        return ingredient.title.toLowerCase().includes(debounce.toLowerCase());
      })
    );
  }, [debounce, savedRecipes]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedRecipes(doc.data()?.savedRecipes);
      setSavedRecipesFilter(doc.data()?.savedRecipes);

      setLoading(false);
    });
  }, [user]);


  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gradient-to-r from-dark to-light-gray min-h-screen pb-16 p-4">
      <div className="sticky top-5 z-20 bg-gradient-to-r from-dark to-light-gray">
        <div className="flex gap-2 items-center">
          <FaHeart className="text-white" />
          {savedRecipesFilter && (
            <div className="text-white text-xl font-semibold">
              Saved Recipes ({savedRecipesFilter.length})
            </div>
          )}
        </div>
        <div className="flex items-center pl-3 bg-light-gray rounded-full mt-3 border-2 border-black">
          <FaSearch className="text-white " />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" w-full py-2 px-2 rounded-full bg-light-gray focus:outline-none text-white"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 flex-wrap mt-4">
        {savedRecipesFilter &&
          savedRecipesFilter.map((recipe: any) => (
            <SavedRecipeCard
              recipe={recipe}
              key={`${recipe.title}-${recipe.id}`}
              isSaving={false}
            />
          ))}
      </div>
    </div>
  );
}

export default Saved;

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { getRecipeDetail } from "@/services/RecipeService";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaHeart } from "react-icons/fa";

function SavedRecipeCard({ recipe, isSaving }) {
  const { user, savedRecipes } = useAuth();

  const [recipeDetails, setRecipeDetails] = useState()
  const [saving, setSaving] = useState(isSaving)

  const recipeID = doc(db, "users", `${user?.email}`);

  const saveRecipe = async(event)=> {
    event.stopPropagation();
    event.nativeEvent.preventDefault();

    setSaving(false)

    await updateDoc(recipeID, {
      savedRecipes: arrayUnion({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        detail: recipeDetails
      })
    })
  }

  const removeSavedRecipe = async(event) => {
    event.stopPropagation();
    event.nativeEvent.preventDefault();

    setSaving(true)

    const res = savedRecipes.filter((r: any) => r.id !== recipe.id)

    await updateDoc(recipeID, {
      savedRecipes: res
    })
  }

  useEffect(() => {
    console.log(savedRecipes)
    const res = savedRecipes.find(({id}: any) => id === recipe.id)
    if(res){
      setSaving(false)
    }
  }, [user])

  useEffect(() => {    
    const getRecipeDetailApi = async() => {
      const detail = await getRecipeDetail(recipe.id)
      setRecipeDetails(detail)
    }

    if(!recipe.detail){
      getRecipeDetailApi()
    }
  }, [])

  return (
    <Link
      href={{
        pathname: `recipe/${recipe.id}`,
        query: recipe.detail || recipeDetails,
      }}
      className="w-[47%] h-full text-white mb-8 relative p-3 shadow-lg shadow-[#475370] rounded-2xl bg-light-gray"
    >
      <div className="bg-light-gray/[0.5] w-8 h-8 rounded-lg flex justify-center items-center absolute top-4 right-4 ">
        {saving ? (
          <FaHeart
            className="text-white w-5 h-5"
            onClick={(event) => saveRecipe(event)}
          />
        ) : (
          <FaTrashAlt
            onClick={(event) => removeSavedRecipe(event)}
            className="text-red-600 w-5 h-5"
          />
        )}
      </div>
      <img
        src={recipe.img || recipe.image}
        alt="img recipe"
        className="w-full h-full rounded-2xl"
      />
      <div className="font-bold text-sm mt-2">{recipe.title}</div>
    </Link>
  );
}

export default SavedRecipeCard;

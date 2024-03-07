import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { getRecipeDetail } from "@/services/RecipeService";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";

function RecipeCard({ recipe, index }: any) {
  const { user, setStatecurrentViewing, setStateSavedRecipes } = useAuth();
  const { ref, inView } = useInView();

  const [recipeDetail, setRecipeDetail] = useState<any>();
  const [savedRecipe, setSavedRecipes] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRecipe, setLoadingRecipe] = useState(true);

  const recipeID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    if (inView) {
      setStatecurrentViewing(index);
    }
  }, [inView]);

  useEffect(() => {
    if(user){
      setLoadingUser(false)
    }
  },[user])


  //check if recipe has been saved or not
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedRecipes(doc.data()?.savedRecipes);
      setStateSavedRecipes(doc.data()?.savedRecipes);

      const result = doc
        .data()
        ?.savedRecipes.find(({ id }: any) => id === recipe.id);
      if (result) {
        setSaved(true);
      }
    });
  }, [user])

  //get recipes from local or API
  useEffect(() => {
    const getRecipe = async (recipeId: string) => {
      const localRecipeDetail = localStorage.getItem(`${recipeId}`);
      if (localRecipeDetail) {
        setRecipeDetail(JSON.parse(localRecipeDetail));
        setLoadingRecipe(false)
      } else {
        const recipeDetail = await getRecipeDetail(recipeId);

        await localStorage.setItem(`${recipeId}`, JSON.stringify(recipeDetail));
        await localStorage.setItem(`${recipeId}-ingredients`, JSON.stringify(recipeDetail.extendedIngredients));
        setRecipeDetail(recipeDetail);
        setLoadingRecipe(false)
      }
    };

    getRecipe(recipe.id);
  }, [recipe]);

  const saveRecipe = async (recipe: any) => {
    setSaved(true);
    if (user?.email) {
      await updateDoc(recipeID, {
        savedRecipes: arrayUnion({
          id: recipe.id,
          title: recipe.title,
          img: recipe.image,
          detail: recipeDetail
        }),
      });
    }
  };

  const removeSavedRecipe = async (passedId: any) => {
    setSaved(false);
    try {
      const res = savedRecipe.filter((recipe: any) => recipe.id !== passedId);
      await updateDoc(recipeID, {
        savedRecipes: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if ( loadingRecipe) {
    return <Spinner />;
  }
  return (
    <div className="h-screen  snap-start relative">
      <div className="h-[40%] w-full relative">
        <img className="w-full h-full object-cover" src={recipe.image} alt="" />
        {user && (
          <div
            className={`flex justify-center items-center absolute top-8 right-5 w-12 h-12 rounded-full border-4 ${
              saved ? "border-primary" : "border-white"
            }  bg-black/[0.4]`}
          >
            <FaHeart
              className={`w-6 h-6 ${saved ? "text-primary" : "text-white"} `}
              onClick={() =>
                !saved ? saveRecipe(recipe) : removeSavedRecipe(recipe.id)
              }
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 pb-28 absolute bottom-0 left-0 h-[65%] w-full rounded-t-3xl text-white font-bold px-4 pt-5 text-2xl bg-gradient-to-r from-dark to-light-gray">
        <div className="flex justify-between items-start">
          <div>{recipe.title}</div>
        </div>
        {recipeDetail && (
          <div
            ref={ref}
            className="flex justify-around items-center border-[1px] border-primary py-3 rounded-2xl"
          >
            <div className="flex flex-col justify-center items-center">
              <p className="text-primary text-xl font-semibold">
                {recipeDetail.nutrition.nutrients[0].amount}
              </p>
              <p className="text-text font-normal text-sm lowercase">
                {recipeDetail.nutrition.nutrients[0].name}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-primary text-xl font-semibold">
                {recipeDetail.readyInMinutes}
              </p>
              <p className="text-text font-normal text-sm">min</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-primary text-xl font-semibold">
                {recipeDetail.servings}
              </p>
              <p className="text-text font-normal text-sm">servings</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-primary text-xl font-semibold">
                {recipeDetail.extendedIngredients.length}
              </p>
              <p className="text-text font-normal text-sm">ingredients</p>
            </div>
          </div>
        )}
        <p className="text-text text-base font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          convallis, urna vitae varius ultricies, magna ipsum convallis nulla,
          non mattis libero purus at velit.
        </p>
        <div className="flex justify-between text-lg">
          <div className="w-[45%] text-center rounded-xl font-normal py-1  border-2 border-primary">
            Not Interested
          </div>
          <Link
            href={{
              pathname: `recipe/${recipe.id}`,
              query: recipeDetail,
            }}
            className="w-[45%] text-center rounded-xl font-semibold py-1 bg-primary"
          >
            Let&apos;s Cook
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

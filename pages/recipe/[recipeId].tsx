import { useRouter } from "next/router";
import { MdLocalGroceryStore } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { getRecipeDetail } from "@/services/RecipeService";
import Spinner from "@/components/Spinner";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

function RecipeDetail() {
  const { pantryIngredients } = useAuth();
  const [loading, setLoading] = useState(true);
  let imageUrl: string = "";
  const router = useRouter();
  const data = router.query;

  if (Array.isArray(data.image)) {
    // If data.image is an array, join its elements into a single string
    imageUrl = data.image.join(",");
  } else {
    // If data.image is not an array, use it directly
    imageUrl = data.image || ""; // Ensure imageUrl is always a string
  }

  useEffect(() => {
    if (imageUrl !== "") {
      setLoading(false);
    }
  }, [imageUrl]);

  //to toggle ingredient availability
  let InitialIngredientsState = [];

  const [selectedTab, setSelectedTab] = useState("ingredients");
  const [ingredients, setIngredients] = useState(InitialIngredientsState);

  const toggleAvailability = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].available = !updatedIngredients[index].available;
    setIngredients(updatedIngredients);
  };

  useEffect(() => {
    const getIngredient = async () => {
      if (data.id) {
        const ingredientsLocal = localStorage.getItem(`${data.id}-ingredients`);

        if (ingredientsLocal) {
          const ingredientsParse = JSON.parse(ingredientsLocal);
          console.log("get Ingredients LOCAL");

          InitialIngredientsState = ingredientsParse.map((ingredient) => ({
            name: ingredient.original,
            available: pantryIngredients.some(
              (obj) => obj.ingredient.id === ingredient.id
            ),
            image: ingredient.image,
            inPantry: pantryIngredients.some(
              (obj) => obj.ingredient.id === ingredient.id
            ),
          }));

          setIngredients(InitialIngredientsState);
        } else {
          console.log("get Ingredients API");
          const recipeDetailApi = await getRecipeDetail(data.id);

          InitialIngredientsState = recipeDetailApi.extendedIngredients.map(
            (ingredient) => ({
              name: ingredient.original,
              available: pantryIngredients.some(
                (obj) => obj.ingredient.id === ingredient.id
              ),
              image: ingredient.image,
              inPantry: pantryIngredients.some(
                (obj) => obj.ingredient.id === ingredient.id
              ),
            })
          );

          setIngredients(InitialIngredientsState);
        }
      }
    };

    getIngredient();
  }, [data, pantryIngredients]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="text-white p-4 min-h-screen">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <div className="w-full min-h-[252px] bg-gray-600 rounded-3xl overflow-hidden mt-5">
        <img className="w-full h-full object-cover" src={imageUrl} alt="" />
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex justify-around flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2 text-xl">
            <a
              onClick={() => setSelectedTab("ingredients")}
              className={`${
                selectedTab === "ingredients"
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent"
              } inline-flex items-center justify-center p-4  rounded-t-lg  group`}
            >
              <MdLocalGroceryStore className="w-6 h-6 mr-2" />
              Ingredients
            </a>
          </li>
          <li className="me-2 text-xl">
            <a
              onClick={() => setSelectedTab("instructions")}
              className={`${
                selectedTab === "instructions"
                  ? "text-primary border-b-2 border-primary dark:text-primary dark:border-primary"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent"
              } inline-flex items-center justify-center p-4  rounded-t-lg active  group`}
              aria-current="page"
            >
              <GiKnifeFork className="w-6 h-6 mr-2" />
              Instructions
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-6 pb-14">
        {selectedTab === "instructions" ? (
          <p
            className="pb-20"
            dangerouslySetInnerHTML={{ __html: data.instructions }}
          ></p>
        ) : (
          <div className="flex justify-between flex-wrap">
            {ingredients.map((i: any, index) => (
              <div
                onClick={() => toggleAvailability(index)}
                key={`${index}-${i.name}`}
                className="bg-white flex flex-col text-black font-bold p-2 w-[10.5rem] rounded-xl mb-5 shadow-sm shadow-white relative"
              >
                <FaCheckCircle
                  className={`${
                    i.available ? "" : "hidden"
                  } absolute top-4 right-4 w-8 h-8 text-green-500`}
                />
                <img
                  src={"/assets/groceries.svg"}
                  className={`${i.inPantry? "" : "hidden"} w-8 h-8 absolute left-4 top-4`}
                />
                <div className="w-full h-[160px]">
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_500x500/${i.image}`}
                    alt={i.name}
                    className="w-full h-full object-fit"
                  />
                </div>
                <div>{i.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;

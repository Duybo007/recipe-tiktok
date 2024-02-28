import { useRouter } from "next/router";
import { MdLocalGroceryStore } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { getRecipeDetail } from "@/services/RecipeService";

function recipeDetail() {
  const router = useRouter();
  const data = router.query;

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
          console.log("get Ingredients LOCAL", ingredientsParse);

          InitialIngredientsState = ingredientsParse.map((ingredient) => ({
            name: ingredient.original,
            available: false,
            image: ingredient.image,
          }));

          setIngredients(InitialIngredientsState);
        } else {
          console.log("get Ingredients API");
          const recipeDetailApi = await getRecipeDetail(data.id);

          InitialIngredientsState = recipeDetailApi.extendedIngredients.map(
            (ingredient) => ({
              name: ingredient.original,
              available: false,
              image: ingredient.image,
            })
          );

          setIngredients(InitialIngredientsState);
        }
      }
    };

    getIngredient();
  }, [data]);

  return (
    <div className="text-white p-4 min-h-screen">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <div>
        <img className="rounded-3xl mt-5" src={data.image} alt="" />
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
                className={`${
                  i.available ? "bg-green-400 " : "bg-white"
                } flex flex-col text-black font-semibold p-2 w-[10.5rem] rounded-xl mb-5 shadow-sm shadow-white`}
              >
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${i.image}`}
                  alt={i.name}
                  className="max-h-[200px] object-fit"
                />
                <div>{i.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default recipeDetail;

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { searchIngredients } from "@/services/RecipeService";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function IngredientsModal({ open, onClose }) {
  const { user, setStatePantryIngredients } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestIngredients, setSuggestIngredients] = useState<any>([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientsPantry, setIngredientsPantry] = useState([]);

  const recipeID = doc(db, "users", `${user?.email}`);

  const handleIngredientClick = (ingredient: any) => {
    // Check if the ingredient is already selected
    const isAlreadySelected = selectedIngredients.includes(ingredient);

    // If not selected, add it to the state array
    if (!isAlreadySelected) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      // If already selected, remove it from the state array
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredient)
      );
    }
  };

  const searchIngredientsApi = async (e) => {
    if (e.key == "Enter") {
      const ingredientsApi = await searchIngredients(searchTerm);

      setSuggestIngredients(ingredientsApi.results);
    }
  };

  const checkIfIngredientSelected = (ingredient) => {
    return selectedIngredients.includes(ingredient);
  };

  const addIngredientsToPantry = async () => {
    const removeDuplicateIngredients = selectedIngredients.filter(
      (item) => !ingredientsPantry.some((obj) => obj.ingredient === item)
    );

    for (const ingredient of removeDuplicateIngredients) {
      await updateDoc(recipeID, {
        savedIngredients: arrayUnion({
          ingredient: ingredient,
        }),
      });
    }

    setSelectedIngredients([]);
  };

  //   const onSearch = async (e) => {
  //     if (e.key == "Enter") {
  //         const res = await getSearchRecipes(searchTerm);
  //         setRecipes(res);
  //     }
  //   };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setIngredientsPantry(doc.data()?.savedIngredients);
      setStatePantryIngredients(doc.data()?.savedIngredients);
    });
  }, [user]);

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/40" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          flex flex-col justify-between bg-white z-50 shadow rounded-xl px-3 py-5 transition-all w-[98%] h-[80%]
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="h-[78%]">
          <h3 className="text-xl font-semibold">Find your ingredients</h3>
          <div className="flex items-center pl-3 bg-gray rounded-full mt-3">
            <FaSearch className="text-dark " />
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => searchIngredientsApi(e)}
              className=" w-full py-2 px-2 rounded-full bg-gray focus:outline-none text-dark"
              type="text"
              placeholder="Search your ingredients"
            />
          </div>
          {/* display selected ingredients */}
          <div className="pt-5 flex gap-3 h-full">
            {selectedIngredients.length > 0 ? (
              <div className="w-[30%] h-full bg-light-primary rounded-2xl overflow-scroll">
                {selectedIngredients.map((ingredient: any, index) => (
                  <div
                    onClick={() => handleIngredientClick(ingredient)}
                    key={`${ingredient.name}-${index}`}
                    className="border-b-2 border-white h-16 flex items-center justify-center font-semibold text-center"
                  >
                    {ingredient.name}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-[30%]"></div>
            )}
            {/* display search ingredients */}
            <div className="w-[70%] flex flex-col gap-3 overflow-scroll">
              {suggestIngredients.map((ingredient: any) => (
                <div
                  onClick={() => handleIngredientClick(ingredient)}
                  key={ingredient.id}
                  className={`w-full shadow ${
                    checkIfIngredientSelected(ingredient)
                      ? "bg-light-primary"
                      : "bg-gray"
                  }  flex justify-between items-center p-3 rounded-xl`}
                >
                  <div className="w-24 h-24 bg-white rounded-xl p-1">
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`}
                      alt={ingredient.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-center font-semibold pr-2">
                    {ingredient.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {user ? (
            <button
              onClick={addIngredientsToPantry}
              className="bg-white border-2 border-primary font-bold py-2 px-4 rounded-lg text-dark"
            >
              Add to pantry
            </button>
          ) : (
            <div></div>
          )}
          <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ">
            Find Recipes
          </button>
        </div>
      </div>
    </div>
  );
}

export default IngredientsModal;

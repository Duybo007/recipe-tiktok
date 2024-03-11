import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

function Pantry({ openTab, setOpenTab }) {
  const { pantryIngredients, user } = useAuth();
  const recipeID = doc(db, "users", `${user?.email}`);

  const removeIngredient = async (ingredient) => {
    const filteredIngredients = pantryIngredients.filter(
      (i: any) => i !== ingredient
    );

    await updateDoc(recipeID, {
      savedIngredients: filteredIngredients,
    });
  };
  return (
    <div
      className={`p-4 duration-300 ease-out transition-all absolute inset-0 bg-dark overflow-scroll text-white ${
        openTab === "pantry" ? "" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between pb-5">
        <MdOutlineKeyboardArrowLeft
          onClick={() => setOpenTab("settings")}
          className="text-white w-10 h-10"
        />
        <div className="text-3xl text-white text-center">Pantry</div>
        <div></div>
      </div>
      <div className="bg-dark w-full flex flex-wrap gap-4 justify-between pb-24">
        {pantryIngredients.map((ingredient: any, index) => (
          <div
            key={`${ingredient.ingredient.id}-${index}`}
            className="bg-gray text-dark text-lg font-semibold w-40 rounded-lg p-3 flex flex-col justify-between items-center"
          >
            <div className="w-full h-36 bg-white rounded-lg overflow-hidden">
              <img
                src={`https://spoonacular.com/cdn/ingredients_500x500/${ingredient.ingredient.image}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">{ingredient.ingredient.name}</div>
            <div
              onClick={() => removeIngredient(ingredient)}
              className="border-2 border-red-600 px-5 text-red-600 rounded-lg mt-3"
            >
              Run Out
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pantry;

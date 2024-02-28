import RecipeCard from "@/components/RecipeCard";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { getRecipesByCuisine } from "@/services/RecipeService";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView();
  const { user, cuisine, currentViewing } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const scrollToCard = (index) => {
    const cardElement = document.getElementById(`card-${index}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const getNextRecipes = async (newOffset) => {
      const data = await getRecipesByCuisine(cuisine, newOffset);
      setRecipes((prevState) => [...prevState, ...data]);

      const newRecipes = [...recipes, ...data];
      await localStorage.setItem("recipes", JSON.stringify(newRecipes));
    };

    if (inView) {
      setOffset((prevOffset) => prevOffset + 5);
      const newOffset = offset + 5;
      getNextRecipes(newOffset);
    }
  }, [inView]);

  useEffect(() => {
    // check if first time user login
    if (user?.email) {
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        if (!doc.data()) {
          setSaveRecipes();
        }
      });
    }
  }, [user?.email]);

  // Set savedRecipes array in DB for first time user
  const setSaveRecipes = () => {
    setDoc(doc(db, "users", user?.email), {
      savedRecipes: [],
      savedIngredients: [],
      notInterested: [],
    });
  };

  useEffect(() => {
    scrollToCard(currentViewing);
  }, [recipes]);

  useEffect(() => {
    const getRecipes = async () => {
      const localRecipes = localStorage.getItem("recipes");
      if (localRecipes) {
        console.log("get local");
        setRecipes(JSON.parse(localRecipes));
        setLoading(false);
      } else {
        console.log("get API");
        const recipesAPI = await getRecipesByCuisine(cuisine, offset);
        await localStorage.setItem("recipes", JSON.stringify(recipesAPI));
        setRecipes(recipesAPI);
        setLoading(false);
      }
    };

    getRecipes();
  }, [cuisine]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main >
      <div className="snap-y snap-mandatory h-screen overflow-scroll">
        {recipes &&
          recipes.map((recipe: any, index) => (
            <div
              id={`card-${index}`}
              ref={index === recipes.length - 1 ? ref : null}
              key={`${recipe.value}-${index}`}
            >
              <RecipeCard recipe={recipe} index={index} />
            </div>
          ))}
      </div>
    </main>
  );
}

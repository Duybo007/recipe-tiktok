import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User as FirebaseUser,
  signInWithRedirect,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({
  user: undefined,
  googleSignIn: () => {},
  logOut: () => {},
  setStateCuisine: (cuisine: string) => {},
  cuisine : "",
  currentViewing: 0,
  setStatecurrentViewing: (index: any) => {},
  savedRecipes: [],
  setStateSavedRecipes: (index: any) => {},
  pantryIngredients: [],
  setStatePantryIngredients: (ingredients: any) => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser>();
  const [currentViewing, setCurrentViewing] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [pantryIngredients, setPantryIngredients] = useState([]);
  const [cuisine, setCuisine] = useState("vietnamese");

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const setStateCuisine = (cuisine: string) => {
    setCuisine(cuisine);
  };

  const setStatecurrentViewing = (index:any) => {
    setCurrentViewing(index);
  }

  const setStateSavedRecipes = (recipes) => {
    setSavedRecipes(recipes)
  }

  const setStatePantryIngredients = (ingredients) =>{
    setPantryIngredients(ingredients)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  const value = {
    user,
    googleSignIn,
    logOut,
    setStateCuisine,
    cuisine,
    setStatecurrentViewing,
    currentViewing,
    savedRecipes,
    setStateSavedRecipes,
    pantryIngredients,
    setStatePantryIngredients
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

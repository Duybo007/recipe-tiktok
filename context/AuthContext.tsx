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
  signInWithRedirect
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
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser>();
  const [currentViewing, setCurrentViewing] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cuisine, setCuisine] = useState("vietnamese");

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
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
    setStateSavedRecipes
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

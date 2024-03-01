import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
import Spinner from "./Spinner";
import { useRouter } from "next/router";

function BottomBar() {
  const { user, googleSignIn, logOut } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);

  useEffect(()=>{
    if(!isMobile()){
      setShowBottomBar(false)
    }
  }, [])

  const isMobile = () => {
    return navigator.maxTouchPoints > 0
  }

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className={`${!showBottomBar && "hidden"} fixed z-50 w-[96%] h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600`}>
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          onClick={() => router.push("/")}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className={`w-5 h-5 mb-1 ${
              router.pathname === "/"
                ? "text-primary text-primary"
                : "text-gray-500 text-gray-400"
            } `}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
        </button>
        <button
          onClick={() => router.push("/search")}
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <FaSearch className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary" />
        </button>
        {!user && (
          <div></div>
        )}
        {loading ? (
          <Spinner />
        ) : user ? (
          <>
            <button
              onClick={handleSignOut}
              data-tooltip-target="tooltip-profile"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <RiLogoutCircleFill className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            </button>
            <button
              onClick={() => router.push("/saved")}
              data-tooltip-target="tooltip-settings"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <FaHeart
                className={`w-5 h-5 mb-1 ${
                  router.pathname === "/saved"
                    ? "text-primary text-primary"
                    : "text-gray-500 text-gray-400"
                } `}
              />
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <RiLoginCircleFill className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          </button>
        )}
        <button
          onClick={() => router.push("/profile")}
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className={`w-5 h-5 mb-1 ${
              router.pathname === "/profile"
                ? "text-primary text-primary"
                : "text-gray-500 text-gray-400"
            } `}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BottomBar;

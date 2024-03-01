import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

function Desktop() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMobile) {
      console.log("true");
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [isMobile]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='bg-[url("https://images.unsplash.com/photo-1517178313064-9447953f46e8?q=80&w=2652&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-screen bg-cover flex flex-col justify-center items-center text-primary font-bold px-4'>
      <div className="relative p-3">
        <h1 className="text-3xl text-center z-10">
          Thank you for visitting my website!
        </h1>
        <div className="w-full h-full absolute top-0 left-0 bg-gray-600/[0.4] blur-sm z-0"></div>
      </div>
      <div className="relative p-3">
        <p className="text-xl text-center z-10">
        Please view this app on a mobile device of switch to mobile and refresh
        the page
        </p>
        <div className="w-full h-full absolute top-0 left-0 bg-gray-600/[0.4] blur-sm z-0"></div>
      </div>
    </div>
  );
}

export default Desktop;

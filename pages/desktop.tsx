import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

function Desktop() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(isMobile) {
      console.log("true")
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [isMobile]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='bg-[url("https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-screen bg-cover'>
      desktop
    </div>
  );
}

export default Desktop;

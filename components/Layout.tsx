import React, { ReactNode, useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import { AuthContextProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  
  const isMobile =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isMobile) {
      router.push("/desktop");
    }
  }, [isMobile]);
  return (
    <AuthContextProvider>
      <main className="bg-gradient-to-r from-black to-light-gray">
        {children}
      </main>
      <BottomBar />
    </AuthContextProvider>
  );
}

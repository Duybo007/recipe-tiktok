import React, { ReactNode, useEffect } from "react";
import BottomBar from "./BottomBar";
import { AuthContextProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
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
      <Head>
        <title>My Recipe</title>
        <link rel="icon" href="/recipe.png" />
      </Head>
      <main className="bg-gradient-to-r from-black to-light-gray">
        {children}
      </main>
      <BottomBar />
    </AuthContextProvider>
  );
}

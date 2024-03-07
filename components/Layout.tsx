import React, { ReactNode, useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import { AuthContextProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import IngredientsModal from "./IngredientsModal";
import { isMobile } from "react-device-detect";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

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
      <IngredientsModal open={openModal} onClose={() => setOpenModal(false)} />
      <BottomBar openModal={() => setOpenModal(true)} />
    </AuthContextProvider>
  );
}

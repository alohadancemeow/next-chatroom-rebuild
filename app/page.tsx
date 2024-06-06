"use client";

import { useEffect } from "react";
import { useUserStore } from "@/states/user-store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

import Auth from "./auth/page";
import Room from "./home/page";

export default function Home() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  // const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid!);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {!currentUser ? <Auth /> : <Room />}
    </main>
  );
}

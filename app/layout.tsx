"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const fetchUser = useAuthStore((state) => state.fetchUser)

  useEffect(() => {
    fetchUser();
  }, [fetchUser])

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}

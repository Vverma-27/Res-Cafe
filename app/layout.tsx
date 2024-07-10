import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchBar from "@/components/searchBar";
import { IoFastFoodOutline } from "react-icons/io5";
import useStore from "@/store";
import Header from "@/components/header";
import { headers } from "next/headers";
import ShareModals from "@/components/shareModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Res&Caf",
  description: "Easy ordering for customers in restaurants",
};

// `w-full min-h-full h-[100vh] p-4 bg-tertiary text-black overflow-y-scroll overflow-x-hidden no-scrollbar flex flex-col`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  console.log("🚀 ~ pathname:", pathname === "/cart");
  return (
    <html lang="en" className="w-[100vw] h-[100vh] no-scrollbar">
      <body
        className={
          inter.className +
          `w-full min-h-full ${
            pathname === "/cart" ? "h-full" : "h-fit"
          } p-4 bg-tertiary text-black overflow-y-scroll overflow-x-hidden no-scrollbar flex flex-col`
        }
      >
        {pathname === "/payment" ? null : <Header />}
        {children}
        <ShareModals />
      </body>
    </html>
  );
}

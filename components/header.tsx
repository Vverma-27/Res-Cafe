"use client";
import React from "react";
import SearchBar from "./searchBar";
import { IoFastFoodOutline } from "react-icons/io5";
import useStore from "@/store";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className={`flex justify-between items-center gap-6 mb-8`}>
      <SearchBar />
      <IoFastFoodOutline
        color="#000"
        fontSize="2.5rem"
        onClick={() => router.push("/cart")}
      />
    </div>
  );
};

export default Header;

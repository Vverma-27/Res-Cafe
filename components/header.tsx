"use client";
import React from "react";
import SearchBar from "./searchBar";
import { IoFastFoodOutline } from "react-icons/io5";
import useStore from "@/store";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { cart } = useStore();
  const items = Object.values(cart)
    ?.map((e) => e.qty)
    ?.reduce((prev, curr) => prev + curr, 0);
  return (
    <div className={`flex justify-between items-center gap-6 mb-8`}>
      <SearchBar />
      <div className="relative">
        <IoFastFoodOutline
          color="#000"
          fontSize="2.5rem"
          onClick={() => router.push("/cart")}
        />
        {items > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#FF9633] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {items}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

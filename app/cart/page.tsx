import DishCard from "@/components/dishCard";
import FeaturedCard from "@/components/featuredCard";
import SearchBar from "@/components/searchBar";
import { IoFastFoodOutline } from "react-icons/io5";
import Image from "next/image";
import CustomLink from "@/components/link";
import { useEffect, useState } from "react";
import { ICategories, IDish } from "@/interfaces";
import DishDisplay from "@/components/dishDisplay";
import Cart from "@/components/cart";
import useStore from "@/store";
import { getMenu } from "@/services/api";

export default function Home() {
  return <Cart />;
}

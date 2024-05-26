import { IDish } from "@/interfaces";
import Image from "next/image";
import React from "react";

const SearchItem = ({ dish }: { dish: IDish }) => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={dish.image || "/assets/images/dishes/lasagna.png"}
        alt={dish.name}
        width={80}
        height={80}
        className="rounded-full aspect-square"
      />
      <div className="flex-1">
        <h6 className="text-sm font-bold capitalize">{dish.name}</h6>
        <p className="text-xs font-light text-gray-600">{dish.description}</p>
      </div>
      <p className="text-right flex-1 text-sm font-light">₹{dish.price}</p>
      <Image
        src={`/assets/images/${dish.veg ? "veg" : "non-veg"}-icon.png`}
        alt="veg icon"
        width={10}
        height={10}
        className="self-start"
      />
    </div>
  );
};

export default SearchItem;

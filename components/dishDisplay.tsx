import { IDish } from "@/interfaces";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import {
  TbSquareRoundedMinusFilled,
  TbSquareRoundedPlusFilled,
} from "react-icons/tb";
import DishCard from "./dishCard";
import Drawer from "./drawer";
import Counter from "./counter";
import useStore from "@/store";
import { useRouter } from "next/navigation";

const DishDisplay = ({
  dish,
  similar,
  qty,
}: {
  dish: IDish;
  similar: IDish[];
  qty: number;
}) => {
  // const [count, setCount] = useState(initialCount);?
  const router = useRouter();
  const onAdd = useStore((state) => state.onAdd);
  const onRemove = useStore((state) => state.onRemove);
  return (
    <Drawer>
      <div className="flex flex-col justify-start gap-4 items-start w-full h-full">
        <Image
          src={dish?.image || "/assets/images/lasagna.png"}
          alt={dish.name}
          width={160}
          height={160}
          className="rounded-full self-center aspect-square"
        />
        <div className="flex w-full justify-between items-center">
          <div>
            <h2 className="font-bold font-sans text-lg capitalize">
              {dish.name}
              <Image
                src={`/assets/images/${dish.veg ? "veg" : "non-veg"}-icon.png`}
                alt={"veg-non-veg"}
                className="inline-block ml-2"
                height={15}
                width={15}
              />
            </h2>
            <p className="font-bold font-sans text-sm text-[#FF9633]">
              ₹{dish.price}
            </p>
          </div>
          <Counter
            onAdd={() => {
              onAdd(dish);
            }}
            onRemove={() => {
              onRemove(dish);
            }}
            count={qty}
          />
        </div>
        <p className="font-light text-sm font-sans flex-grow overflow-y-scroll no-scrollbar h-[10px]">
          {dish.description || "No description available"}
        </p>
        {/* </div> */}
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <p className="font-bold font-sans text-[#777]">Similar Dishes</p>
        <div className="flex justify-start gap-6 items-center max-w-fit w-[calc(100vw-1rem)] overflow-x-scroll p-1 pb-3 no-scrollbar">
          {similar.map((dishArg: IDish) => {
            if (dishArg.name === dish.name) return null;
            return (
              <>
                <DishCard dish={dishArg} />
                {/* <DishCard dish={dish} onClick={() => setActiveDish(dish)} /> */}
              </>
            );
          })}
        </div>
      </div>
      <button
        className="bg-[#FF9633] py-3.5 px-10 text-white rounded-xl text-sm self-end"
        onClick={() => router.push("/cart")}
      >
        View Cart
      </button>
    </Drawer>
  );
};

export default DishDisplay;

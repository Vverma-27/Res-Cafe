import { IDish } from "@/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import Counter from "./counter";
import useStore from "@/store";

const CartItem = ({ dish, qty }: { dish: IDish; qty: number }) => {
  const onAdd = useStore((state) => state.onAdd);
  const onRemove = useStore((state) => state.onRemove);
  return (
    <div className="flex justify-between items-start w-full">
      <div className="flex items-start gap-4">
        <Image
          src={dish?.image || "/assets/images/lasagna.png"}
          alt={dish.name}
          width={100}
          height={100}
          className="rounded-lg aspect-square"
        />
        <div>
          <p className="font-sans text-md font-semibold capitalize">
            {dish.name}
          </p>
          <p className="font-sans text-xs font-light">₹{dish.price}</p>
        </div>
      </div>
      <Counter
        onAdd={() => {
          onAdd(dish);
        }}
        onRemove={() => {
          onRemove(dish);
        }}
        count={qty}
        className="self-end"
      />
    </div>
  );
};

export default CartItem;

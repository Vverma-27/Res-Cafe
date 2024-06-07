import { IDish } from "@/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import Counter from "./counter";
import useStore from "@/store";
import ShareListItem from "./shareListItem";
import colors from "@/constants/colors";

const CartItem = ({ dish, qty }: { dish: IDish; qty: number }) => {
  const { onAdd, onRemove, usersAtTable } = useStore();
  const [openShareMenu, setOpenShareMenu] = useState(false);
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
          {usersAtTable.length ? (
            <div className="mt-1 flex flex-col gap-0 items-start justify-start relative">
              <p className="font-light opacity-70 font-sans text-xs">
                Shared By
              </p>
              <button
                className="bg-[#FF9633] text-white rounded-md p-0.5 rounded-full shadow-custom relative"
                onClick={() => {
                  setOpenShareMenu((os) => !os);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v12m0-6h6m-6 0H6"
                  ></path>
                </svg>
                {openShareMenu ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute right-0 top-0 translate-x-[103%] overflow-y-scroll p-1 px-2 no-scrollbar bg-white rounded-lg w-max max-w-[30vw] max-h-[15vh] flex flex-col gap-1"
                  >
                    {usersAtTable.map((e, i) => (
                      <React.Fragment key={i}>
                        <ShareListItem
                          name={e}
                          status={"req"}
                          bg={colors[i % 4]}
                        />
                        {/* <hr className="my-1.5" /> */}
                      </React.Fragment>
                    ))}
                  </div>
                ) : null}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full">
        <Image
          src={`/assets/images/${dish.veg ? "veg" : "non-veg"}-icon.jpg`}
          alt={"veg-non-veg"}
          className="inline-block ml-2"
          height={15}
          width={15}
        />
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
    </div>
  );
};

export default CartItem;

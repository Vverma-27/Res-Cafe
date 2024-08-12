import { IDish } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Counter from "./counter";
import useStore from "@/store";
import ShareListItem from "./shareListItem";
import colors from "@/constants/colors";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CartItem = ({
  dish,
  qty,
  // shared,
  numSplitters,
  setNumSplitters,
  setExclude,
  exclude,
  interactive,
}: {
  dish: IDish;
  qty: number;
  // shared: string;
  numSplitters: number;
  exclude: boolean;
  interactive?: boolean;
  setNumSplitters: (num: number) => void;
  setExclude: (exclude: boolean) => void;
}) => {
  const { onAdd, onRemove } = useStore();
  const [showSharingOptions, setShowSharingOptions] = useState(false);
  return (
    <div className="flex justify-start items-start w-full gap-1.5">
      <div className="flex items-start gap-4 flex-1">
        <Image
          src={dish?.image || "/assets/images/lasagna.png"}
          alt={dish.name}
          width={100}
          height={100}
          className="rounded-lg aspect-square"
        />
        <div className="flex-1">
          <p className="font-sans text-md font-semibold capitalize">
            {dish.name}
          </p>
          <div className="flex items-center justify-start gap-2">
            <p
              className={`font-sans text-xs font-light ${
                numSplitters > 1 ? "line-through" : ""
              }`}
            >
              ₹{dish.price * qty}
            </p>
            <p className="font-sans text-xs font-light">
              {numSplitters > 1
                ? "₹" + ((dish.price / numSplitters) * qty).toFixed(0)
                : null}
            </p>
          </div>
          {interactive ? (
            <>
              <div
                className="flex items-center justify-start gap-1 cursor-pointer"
                onClick={() => {
                  setShowSharingOptions((so) => !so);
                }}
              >
                {showSharingOptions ? (
                  <FaChevronUp className="text-[0.5rem] font-base" />
                ) : (
                  <FaChevronDown className="text-[0.5rem] font-base" />
                )}
                <p className="text-[0.5rem] font-light">
                  {showSharingOptions ? "Close" : "Show"} Sharing Options
                </p>
              </div>
              {showSharingOptions ? (
                <>
                  <label
                    className="font-light opacity-70 font-sans text-[0.6rem]"
                    htmlFor="num-splitters"
                  >
                    Number of splitters:
                  </label>
                  <div className="bg-[#FF9633] border border-transparent text-white rounded-md py-1 text-xs font-bold shadow-custom flex items-center justify-between w-[14vw] px-1">
                    <button
                      onClick={() => {
                        setNumSplitters(numSplitters - 1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-2.5"
                          strokeWidth="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                    <input
                      type="number"
                      className="max-w-[calc(13vw-1.5rem)] text-white text-[0.6rem] bg-inherit text-center h-full pt-[2px]"
                      value={numSplitters}
                      onChange={(e) => {
                        setNumSplitters(+e.target.value);
                      }}
                    />
                    {/* <span>{numSplitters}</span> */}
                    <button
                      onClick={() => {
                        setNumSplitters(numSplitters + 1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2"
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
                    </button>
                  </div>
                  <div className=" flex items-center gap-1 mt-2.5">
                    <input
                      type="checkbox"
                      id="exclude"
                      checked={exclude}
                      onChange={(e) => setExclude(e.target.checked)}
                    />
                    <label
                      className="font-light opacity-70 font-sans text-[0.6rem] pt-[1.5px]"
                      htmlFor="exclude"
                    >
                      Exclude me from split
                    </label>
                  </div>
                </>
              ) : null}
            </>
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
        {interactive ? (
          <Counter
            unavailable={dish.unavailable}
            onAdd={() => {
              onAdd(dish);
            }}
            onRemove={() => {
              onRemove(dish);
            }}
            count={qty}
            className="self-end"
          />
        ) : null}
        {/* )} */}
      </div>
    </div>
  );
};

export default CartItem;

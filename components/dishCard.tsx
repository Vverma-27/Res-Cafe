import { IDish } from "@/interfaces";
import useStore from "@/store";
import Image from "next/image";
import React from "react";
import Counter from "./counter";

const DishCard = ({
  dish,
  imageOverflow,
}: {
  dish: IDish;
  imageOverflow?: boolean;
}) => {
  const { setActiveDish, cart, onAdd, onRemove } = useStore();

  return (
    <div
      className={` pb-3 px-0 rounded-xl relative ${
        imageOverflow
          ? "bg-primary min-w-[30vw] w-[37vw]"
          : "bg-white min-w-[34vw] pt-2"
      } flex flex-col justify-between items-center font-mono text-black gap-2`}
      style={{
        boxShadow: imageOverflow
          ? "rgba(0, 0, 0, 0.25) -8px 8px 10px -10px"
          : "rgba(0, 0, 0, 0.25) 1px 4px 10px 0px",
      }}
      onClick={() => setActiveDish(dish)}
    >
      <div
        className={`overflow-hidden rounded-full relative ${
          imageOverflow ? "mb-[-2vh] top-[-4vh]" : ""
        }`}
        style={
          imageOverflow
            ? {
                width: "14vh",
                height: "14vh",
              }
            : {
                width: "10vh",
                height: "10vh",
              }
        }
      >
        {/* <div
          className="relative rounded-full overflow-hidden"
          style={{ width: "100%", height: "100%" }}
        > */}
        <Image
          src={dish.image || "/assets/images/lasagna.png"}
          alt={"dish image"}
          // layout="fill"
          height={200}
          width={200}
          style={{ height: "100%", width: "100%" }}
        />
        {/* </div> */}
      </div>
      <div className="flex flex-col gap-[1vh] items-start justify-center w-full px-2">
        <p className="font-black text-sm capitalize text-center">
          {dish.name}
          <Image
            src={`/assets/images/${dish.veg ? "veg" : "non-veg"}-icon.jpg`}
            alt={"veg-non-veg"}
            className="absolute top-2 right-2"
            height={11}
            width={11}
          />
        </p>
        <p
          className="text-xs font-extralight flex items-center justify-between w-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          ₹{dish.price}
          {cart?.[dish.name]?.qty ? (
            <div className="bg-[#FF9633] border border-transparent text-white rounded-md py-1 text-xs font-bold shadow-custom flex items-center justify-between w-[14vw] px-1">
              <button onClick={() => onRemove(dish)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-2.5"
                    stroke-width="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
              <span>{cart?.[dish.name]?.qty}</span>
              <button onClick={() => onAdd(dish)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v12m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          ) : dish.unavailable ? (
            <button
              className=" border-gray-600 border text-gray-600 rounded-md py-1 px-1 text-xxs font-semibold w-[14vw]"
              disabled
            >
              Unavailable
            </button>
          ) : (
            <button
              className="border-[#FF9633] border text-[#FF9633] rounded-md py-1 px-3 text-xs font-semibold w-[14vw]"
              onClick={() => onAdd(dish)}
            >
              ADD
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default DishCard;

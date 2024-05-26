import { IDish } from "@/interfaces";
import useStore from "@/store";
import Image from "next/image";
import React from "react";

const DishCard = ({
  dish,
  imageOverflow,
}: {
  dish: IDish;
  imageOverflow?: boolean;
}) => {
  const setActiveDish = useStore((state) => state.setActiveDish);
  return (
    <div
      className={` py-2 px-0 rounded-xl relative ${
        imageOverflow
          ? "bg-primary min-w-[30vw] w-[38vw]"
          : "bg-white min-w-[37vw]"
      } flex flex-col justify-between items-center font-mono text-black gap-3`}
      style={{
        boxShadow: imageOverflow
          ? "rgba(0, 0, 0, 0.25) -8px 8px 10px -10px"
          : "rgba(0, 0, 0, 0.25) 1px 4px 10px 0px",
      }}
      onClick={() => setActiveDish(dish)}
    >
      <div
        className={`rounded-full overflow-hidden  relative ${
          imageOverflow ? "mb-[-2vh] top-[-4vh]" : ""
        }`}
        style={{
          width: "14vh",
          height: "14vh",
        }}
      >
        {/* <div
          className="relative rounded-full overflow-hidden"
          style={{ width: "100%", height: "100%" }}
        > */}
        <Image
          src={dish.image || "/assets/images/lasagna.png"}
          alt={"dish image"}
          height={200}
          width={200}
          style={{ height: "100%" }}
        />
        {/* </div> */}
      </div>
      <div className="flex flex-col gap-0 items-center justify-center">
        <p className="font-black text-sm capitalize w-[100%] text-center">
          {dish.name}
          <Image
            src={`/assets/images/${dish.veg ? "veg" : "non-veg"}-icon.png`}
            alt={"veg-non-veg"}
            className="absolute top-2 right-2"
            height={11}
            width={11}
          />
        </p>
        <p className="text-xs font-light">₹{dish.price}</p>
      </div>
    </div>
  );
};

export default DishCard;

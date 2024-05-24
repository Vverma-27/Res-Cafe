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
      className={`min-w-[37vw] flex-1 py-2 px-2.5 rounded-xl ${
        imageOverflow ? "bg-primary" : "bg-white"
      } flex flex-col justify-between items-center font-mono text-black`}
      style={{
        boxShadow: imageOverflow
          ? "rgba(0, 0, 0, 0.25) 1px 4px 36px 0px"
          : "rgba(0, 0, 0, 0.25) 1px 4px 10px 0px",
      }}
      onClick={() => setActiveDish(dish)}
    >
      <div
        className={`rounded-full overflow-hidden  relative ${
          imageOverflow ? "mb-[-2vh] top-[-4vh]" : ""
        }`}
        style={{
          width: "15.5vh",
          height: "15.5vh",
        }}
      >
        {/* <div
          className="relative rounded-full overflow-hidden"
          style={{ width: "100%", height: "100%" }}
        > */}
        <Image
          src={dish.image || "/assets/images/lasagna.png"}
          alt={"dish image"}
          height={600}
          width={300}
          style={{ width: "400px", height: "100%" }}
        />
        {/* </div> */}
      </div>
      <p className="font-black text-sm">{dish.name}</p>
      <p className="text-xs font-light">₹{dish.price}</p>
    </div>
  );
};

export default DishCard;

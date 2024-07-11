"use client";
import React from "react";
import Modal from "./modal";
import useStore from "@/store";
import colors from "@/constants/colors";
import Image from "next/image";
import { CiCircleInfo } from "react-icons/ci";

const ShareModals = () => {
  const { shareReqs, socket, removeReq, onAdd, menu } = useStore();
  console.log("🚀 ~ ShareModals ~ shareReqs:", shareReqs);
  return (
    <>
      {shareReqs
        .reverse()
        .map(({ name, image, price, dish, veg, _id, numSplitters }, i) => (
          <Modal isOpen={true} key={i}>
            <>
              <div className="flex justify-center">
                <Image
                  src={`/assets/images/${veg ? "veg" : "non-veg"}-icon.jpg`}
                  alt={"veg-non-veg"}
                  className="absolute top-2 right-2"
                  height={15}
                  width={15}
                />
                <div
                  className={`aspect-square rounded-full  h-[50px] w-[50px]  ${
                    colors[i % 4]
                  } flex justify-center items-center text-lg font-light text-white font-inter z-[1]`}
                >
                  {name
                    .split(" ")
                    .map((e) => e[0])
                    .join("")}
                </div>
                <Image
                  src={image || "/assets/images/lasagna.png"}
                  alt={dish}
                  width={50}
                  height={50}
                  className="rounded-full self-center aspect-square h-[50px] w-[50px] -ml-[10px]"
                />
              </div>
              <p className="font-bold font-sans text-sm text-[#FF9633] text-center">
                ₹{price}
              </p>
              <p className="font-light text-md text-center mt-4 mb-[6vh]">
                <span className="text-[#FF9633]">{name}</span> has requested to
                share <span className="text-[#FF9633]">{dish}</span> with you.
                Your split of the dish is{" "}
                <span className="text-[#FF9633]">
                  ₹{(price / (numSplitters + 1)).toFixed(0)}
                </span>
                <span className="text-xxs font-light text-gray-400 flex justify-center items-center mt-2">
                  <CiCircleInfo />
                  The split amount may be changed, as number of splitters
                  change.
                </span>
              </p>
              <div className="flex absolute left-0 right-0 bottom-0 h-[6vh]">
                <button
                  className="flex-1 h-full border-[#097969] border text-[#097969] rounded-bl-lg z-[1]"
                  onClick={() => {
                    socket?.emit("accept-req", {
                      name,
                      dish,
                      price,
                      image,
                      veg,
                      _id,
                      numSplitters,
                    });
                    onAdd({ name: dish, price, image, veg, _id }, name);
                    removeReq();
                  }}
                >
                  Accept
                </button>
                <button
                  className="flex-1 h-full border-[#FF7F7F] border text-[#FF7F7F] rounded-br-lg border-l-0"
                  onClick={() => {
                    removeReq();
                  }}
                >
                  Deny
                </button>
              </div>
            </>
          </Modal>
        ))}
    </>
  );
};

export default ShareModals;

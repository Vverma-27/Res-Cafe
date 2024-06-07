import React from "react";

const ShareListItem = ({
  name,
  status,
  bg,
}: {
  name: string;
  status: "req" | "acc" | "den";
  bg: string;
}) => {
  return (
    <div className="flex text-black items-start space-x-1 font-inria">
      <div
        className={`aspect-square rounded-full  h-[30px] w-[30px]  ${bg} flex justify-center items-center text-sm font-light text-white font-inter`}
      >
        {/* <span className="leading-none "> */}
        {name
          .split(" ")
          .map((e) => e[0])
          .join("")}
        {/* </span> */}
      </div>
      <div className="flex flex-col items-start gap-[1px] mt-[1px]">
        <p className="font-extralight text-[0.55rem] text-[rgba(0,0,0,0.6)] leading-none">
          {name}
        </p>
        <button
          className={`text-[0.35rem] rounded-sm border font-inter border-[#FF9633] text-[#FF9633] font-semibold pt-[2px] pb-[1px] px-[6px] ${
            status === "req"
              ? "border-[#FF9633]"
              : status === "acc"
              ? "border-green"
              : "border-black"
          }`}
        >
          {/* <span className="leading-none"> */}
          {status === "req"
            ? "Request"
            : status === "acc"
            ? "Accepted"
            : "Denied"}
          {/* </span> */}
        </button>
      </div>
    </div>
  );
};

export default ShareListItem;

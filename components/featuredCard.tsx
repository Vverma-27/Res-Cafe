import Image from "next/image";
import React from "react";

const FeaturedCard = () => {
  return (
    <div className="max-w-[320px] min-w-[240px] h-32 w-[75vw] py-3.5 px-2.5 rounded-lg bg-tertiary border border-solid border-[rgba(0,0,0,0.5)] flex flex-col justify-between items-start font-mono relative">
      <div className="w-1/2">
        <p className="text-xxs">Product of the day</p>
        <p className="text-md">
          Protein Veg <br /> Salad
        </p>
      </div>
      <p className="text-sm">₹500</p>
      <div
        className="absolute bottom-[8%] left-[60%] rounded-full overflow-hidden"
        style={{ width: "17vh", height: "17vh" }}
      >
        {/* <div
          className="relative rounded-full overflow-hidden"
          style={{ width: "100%", height: "100%" }}
        > */}
        <Image
          src={"/assets/images/dish.png"}
          alt={"dish image"}
          height={600}
          width={300}
          style={{ width: "400px", height: "100%" }}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default FeaturedCard;

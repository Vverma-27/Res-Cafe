import BackButton from "@/components/backButton";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  // const
  return (
    <div className="flex justify-center items-center flex-1 w-full flex-col font-manrope">
      <Image
        src={"/assets/images/404.png"}
        alt={"404 image"}
        width={300}
        height={300}
      />
      <Image
        src={"/assets/images/404error.png"}
        alt={"404 image"}
        width={150}
        height={150}
        className="mt-[-2vh]"
      />
      <div className="flex flex-col justify-center items-center gap-3 mt-[2vh]">
        <h1 className="font-semibold text-xl">Page Not Found</h1>
        <p className="font-light text-md">
          Sorry this page is as empty as this plate
        </p>
        <p className="text-[#E4C41B] font-bold text-sm">
          Don{"'"}t worry Just Take a Break or Try Reloading
        </p>
      </div>
      <BackButton />
    </div>
  );
};

export default NotFound;

"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center gap-0.5 cursor-pointer"
    >
      <BiArrowBack color="black" fontSize={12} />
      <p className="font-bold text-xs">Back</p>
    </div>
  );
};

export default BackButton;

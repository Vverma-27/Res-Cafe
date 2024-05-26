import React from "react";

const CustomLink = ({
  active,
  text,
  onClick,
}: {
  active: boolean;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`font-normal ${
        !active
          ? "bg-transparent opacity-80 text-gray-400 "
          : "text-black font-bold border-b-[#FF9633] border-b-[1px] border-solid"
      }  font-signika text-sm color-primary py-2 px-4 min-w-fit capitalize`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomLink;

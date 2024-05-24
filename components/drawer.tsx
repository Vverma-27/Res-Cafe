import useStore from "@/store";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const Modal = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  const { setActiveDish } = useStore();
  const onBack = () => {
    setActiveDish(null);
  };
  return (
    <div className="inset-0 fixed flex items-end bg-[rgba(0,0,0,0.2)]">
      <div
        className={
          className +
          " flex flex-col justify-between items-start h-[90%] rounded-t-2xl w-full bg-white p-4 relative"
        }
      >
        <div
          onClick={onBack}
          className="absolute left-4 top-4 flex items-center gap-0.5 cursor-pointer"
        >
          <BiArrowBack color="black" fontSize={12} />
          <p className="font-bold text-xs">Back</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import useStore from "@/store";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";

const Drawer = ({
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
        onClick={onBack}
        className="absolute margin-auto flex items-center gap-0.5 cursor-pointer top-[5vh] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <IoIosCloseCircle color="#white" fontSize={35} />
      </div>
      <div
        className={
          className +
          " flex flex-col justify-between items-start h-[90%] rounded-t-2xl w-full bg-white p-4 relative"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;

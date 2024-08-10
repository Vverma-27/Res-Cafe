import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  return (
    <section className="h-full w-full flex-1 flex justify-center items-center flex-col gap-8">
      <FaCheckCircle className="text-green-300" style={{ fontSize: "10rem" }} />
      <h3 className="text-sm font-para ">We are processing your payment.</h3>
      <h1 className=" text-xl text-center text-bold font-heading">
        Your Order has been placed successfully
      </h1>
    </section>
  );
};

export default Success;

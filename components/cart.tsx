"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "./cartItem";
import useStore from "@/store";
import Modal from "./modal";
import { BiArrowBack } from "react-icons/bi";
import { createClient } from "@/services/api";

const Cart = () => {
  const { cart, table, setNumSplitters, setExclude } = useStore();
  console.log("🚀 ~ cart:", cart);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  useEffect(() => {
    // Only run this code on the client side
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
    setNumber(localStorage.getItem("number") || "");
  }, []);
  if (Object.values(cart).length === 0) {
    router.push("/?table=" + table);
    return null;
  }

  const total = Object.values(cart)
    ?.filter((e) => e.dish !== undefined)
    ?.map((e) => e.dish.price * e.qty)
    ?.reduce((prev, curr) => prev + curr, 0);
  const totalPayable = Object.values(cart)
    ?.filter((e) => e.dish !== undefined)
    ?.map((e) =>
      e.exclude
        ? 0
        : +((e.dish.price / (e.numSplitters || 1)) * e.qty).toFixed(0)
    )
    ?.reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="flex flex-col h-[85.5vh] w-full overflow-hidden">
      <div className="w-full flex flex-col gap-6 flex-grow overflow-hidden">
        <div className="relative">
          <div
            onClick={() => router?.back()}
            className="flex items-center gap-0.5 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-[1]"
          >
            <BiArrowBack color="black" fontSize={12} />
            <p className="font-bold text-xs">Back</p>
          </div>
          <h2 className="font-bold opacity-60 font-sans text-sm flex-1 text-center">
            Cart
          </h2>
        </div>
        <div className="flex flex-col gap-6 w-full overflow-y-auto no-scrollbar h-full">
          {Object.values(cart).map((item) =>
            item.dish ? (
              <>
                <CartItem
                  key={item.dish.name} // Ensure each CartItem has a unique key
                  dish={item.dish}
                  qty={item.qty}
                  exclude={Boolean(item.exclude)}
                  setExclude={(exclude) => {
                    setExclude(item.dish.name, exclude);
                  }}
                  interactive
                  setNumSplitters={(num) => {
                    if (num > 0) setNumSplitters(item.dish.name, num);
                  }}
                  // shared={item.shared || ""}
                  numSplitters={item.numSplitters || 1}
                />
              </>
            ) : null
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full flex-shrink-0 p-4 pb-0 shadow-lg">
        <p className="font-sans text-md font-semibold">Order Summary</p>
        <div className="pl-2 flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center w-full">
            <p className="font-sans text-sm text-[#777] font-light">
              Item Total
            </p>
            <p className="font-sans text-sm text-[#777] font-light">
              ₹{totalPayable}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-sans text-sm text-[#777] font-light">Taxes</p>
            <p className="font-sans text-sm text-[#777] font-light">
              ₹{(0.18 * totalPayable).toFixed(0)}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-sans text-sm text-[#777] font-light">
              Convenience Fee
            </p>
            <p className="font-sans text-sm text-[#777] font-light">
              ₹{(0.03 * totalPayable).toFixed(0)}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <p>Total Price</p>
            <p className="font-sans text-md font-semibold">
              ₹{(1.21 * totalPayable).toFixed(0)}
            </p>
          </div>
          <button
            className="bg-[#FF9633] py-3.5 px-10 text-white rounded-xl text-sm"
            onClick={() => setModalOpen(true)}
          >
            Checkout
          </button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-full flex flex-col gap-2 flex-grow overflow-hidden">
          <h2 className="font-semibold font-sans text-md">Contact Details</h2>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold text-xs">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent rounded-lg text-sm font-semibold py-2 px-1 border-2"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-xs">
                Email
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-transparent rounded-lg text-sm font-semibold py-2 px-1 border-2"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-bold text-xs">
                Phone no.
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="bg-transparent rounded-lg text-sm font-semibold py-2 px-1 border-2"
                name="phone"
                placeholder="Enter your phone"
              />
            </div>
          </div>
          <div className=" mt-4 flex justify-start gap-2">
            <button
              className="bg-[#FF9633] py-3.5 px-10 text-white rounded-xl text-sm"
              onClick={async () => {
                localStorage?.setItem("name", name);
                localStorage?.setItem("email", email);
                localStorage?.setItem("number", number);
                const { id } = await createClient({ email, name, number });
                // console.log("🚀 ~ onClick={ ~ id:", res);
                router.push(
                  "/payment?" +
                    new URLSearchParams({
                      firstname: name.split(" ")[0],
                      lastname: name.split(" ").slice(1).join(" "),
                      amount: (1.21 * total).toFixed(0),
                      amountPayable: (1.21 * totalPayable).toFixed(0),
                      email,
                      number,
                      id,
                      productinfo: Object.values(cart)
                        .map(
                          (d) => `${d.qty}:${d.dish._id}:${d.numSplitters || 1}`
                        )
                        .join(","),
                    }).toString()
                );
              }}
            >
              Pay Now
            </button>
            <button
              className="bg-[#4b4948] py-3.5 px-10 text-white rounded-xl text-sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;

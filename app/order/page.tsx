"use client";
import { createClient, getOrderDetails } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "../../components/cartItem"; // Assuming CartItem is reusable
import { IDish, OrderStatus } from "@/interfaces";
import Modal from "@/components/modal";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState<{
    date: string;
    orderDetails: { dish: IDish; qty: number; numSplitters: number }[];
    remainingAmount: number;
    transactions: { name: string; amount: number }[];
    _id: string;
    status: OrderStatus;
  } | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderID = searchParams.get("orderID");
      const res = await getOrderDetails(orderID as string);
      setOrderDetails(res.order);
    };
    fetchOrderDetails();
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
    setNumber(localStorage.getItem("number") || "");
  }, []);

  const handleDishSelection = (dishId: string) => {
    setSelectedDishes((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  if (!orderDetails)
    return (
      <div
        role="status"
        className="flex justify-center items-center w-full h-full"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

  if (
    orderDetails.remainingAmount <= 0 ||
    orderDetails.status === OrderStatus.PAIDINFULL ||
    orderDetails.status === OrderStatus.CANCELLED ||
    orderDetails.status === OrderStatus.COMPLETED
  ) {
    return <p>Order already completed. No further action required.</p>;
  }
  const totalPayable = orderDetails.orderDetails
    .map((item) =>
      selectedDishes.includes(item.dish._id)
        ? +((item.dish.price / (item.numSplitters || 1)) * item.qty).toFixed(0)
        : 0
    )
    .reduce((prev, curr) => prev + curr, 0);

  const taxes = (0.18 * totalPayable).toFixed(0);
  const convenienceFee = (0.03 * totalPayable).toFixed(0);
  const finalTotal = (1.21 * totalPayable).toFixed(0);

  return (
    <div className="flex flex-col h-[85.5vh] w-full overflow-hidden">
      <h1 className="text-xl font-bold mb-4">
        Remaining Amount: ₹{orderDetails.remainingAmount}
      </h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Past Transactions:</h2>
        {orderDetails.transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span className="text-base">{transaction.name}</span>
            <span className="text-base">${transaction.amount}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-6 flex-grow overflow-hidden">
        <h2 className="text-lg font-semibold mb-2">Select Dishes:</h2>
        <div className="flex flex-col gap-6 w-full overflow-y-auto no-scrollbar h-full">
          {orderDetails.orderDetails.map((item) => (
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={selectedDishes.includes(item.dish._id)}
                onChange={() => handleDishSelection(item.dish._id)}
              />
              <CartItem
                key={item.dish._id}
                dish={item.dish}
                qty={item.qty}
                exclude={false}
                setExclude={(_exclude) => {}}
                setNumSplitters={(_num) => {}}
                numSplitters={item.numSplitters}
              />
            </div>
          ))}
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
            <p className="font-sans text-sm text-[#777] font-light">₹{taxes}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-sans text-sm text-[#777] font-light">
              Convenience Fee
            </p>
            <p className="font-sans text-sm text-[#777] font-light">
              ₹{convenienceFee}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <p>Total Price</p>
            <p className="font-sans text-md font-semibold">₹{finalTotal}</p>
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
                      amount: orderDetails.remainingAmount.toFixed(0),
                      amountPayable: (1.21 * totalPayable).toFixed(0),
                      email,
                      number,
                      id,
                      orderID: searchParams.get("orderID") as string,
                      selectedDishes: selectedDishes.join(","),
                      productinfo: orderDetails.orderDetails
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

export default Order;

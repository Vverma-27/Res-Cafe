"use client";
import { getOrderDetails } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const searchParams = useSearchParams();
  console.log("🚀 ~ Order ~ orderDetails:", orderDetails);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderID = searchParams.get("orderID");
      const res = await getOrderDetails(orderID as string);
      setOrderDetails(res.order);
    };
    fetchOrderDetails();
  }, []);
  if (!orderDetails) return null;
  return <div>Order</div>;
};

export default Order;

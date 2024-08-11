"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineShare } from "react-icons/hi";

const Success = () => {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [text, setText] = useState("Copy Link");
  let timeout = useRef<number>(null);

  useEffect(() => {
    setUrl(
      window.location.origin + "/order?orderID=" + searchParams.get("orderID")
    );
    return () => {
      //@ts-ignore
      clearTimeout(timeout.current);
    };
  }, [searchParams]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // alert("Link copied to clipboard!");
    setText("Copied");
    setTimeout(() => {
      setText("Copy Link");
    }, 2000);
  };

  const shareLink = async () => {
    try {
      await navigator.share({ title: "Order Payment Link", url });
    } catch (error) {
      console.error("Error sharing the link", error);
    }
  };

  return (
    <section className="h-full w-full flex-1 flex justify-center items-center flex-col gap-8 p-4">
      <FaCheckCircle className="text-green-300" style={{ fontSize: "10rem" }} />
      <h3 className="text-sm font-para">We are processing your payment.</h3>
      <h1 className="text-xl text-center font-bold font-heading">
        Your Order has been placed successfully
      </h1>
      <p className="text-sm font-para text-center">
        Share the link below with your friends to pay the remaining amount.
      </p>
      <div className="w-full max-w-lg bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
        <Link href={url}>
          <p className="text-blue-600 break-words text-center">{url}</p>
        </Link>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-gray-200 p-2 rounded-md shadow-md hover:bg-gray-300"
        >
          <IoCopyOutline className="text-xl" />
          <span>{text}</span>
        </button>
        <button
          onClick={shareLink}
          className="flex items-center gap-2 bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
        >
          <HiOutlineShare className="text-xl" />
          <span>Share Link</span>
        </button>
      </div>
    </section>
  );
};

export default Success;

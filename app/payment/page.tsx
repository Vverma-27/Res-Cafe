"use client";
import { useSearchParams } from "next/navigation";
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  RefObject,
  useCallback,
  Suspense,
} from "react";

const PaymentComponent = () => {
  const [hash, setHash] = useState("");
  const searchParams = useSearchParams();
  const formRef = useRef<any>();
  const generateTxnId = () => {
    const now = new Date();
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const day = String(now.getDate()).padStart(2, "0"); // Day of the month (2 digits)
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month (2 digits, zero-based index so add 1)
    const randomPart = Math.floor(Math.random() * 10000); // Random number between 0 and 9999

    return `TXN${timestamp}${day}${month}${randomPart}`;
  };
  const txnid = useMemo(() => generateTxnId(), []);
  // This method will generate the hash value
  const paymentReq = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.CLIENT_API_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const hash = (await response.json()).hash;
      setHash(hash);
    } catch (error) {
      console.log("Payment Error:", error);
    }
  }, []);
  const data = useMemo(
    () => ({
      txnid, // String
      amount: searchParams.get("amount") || "0", // Float
      productinfo: "food", // String
      firstname: searchParams.get("firstname") || "", // String
      email: searchParams.get("email") || "", // String
    }),
    []
  );
  useEffect(() => {
    paymentReq();
  }, [paymentReq]);
  useEffect(() => {
    if (hash) formRef.current?.submit();
  }, [hash]);
  return (
    <form action={process.env.NEXT_PUBLIC_PAYU_URL} method="post" ref={formRef}>
      <input
        type="hidden"
        name="key"
        value={process.env.NEXT_PUBLIC_PAYU_KEY}
      />
      <input type="hidden" name="txnid" value={txnid} />
      <input type="hidden" name="productinfo" value={data.productinfo} />
      <input type="hidden" name="amount" value={data.amount} />
      <input type="hidden" name="email" value={data.email} />
      <input type="hidden" name="firstname" value={data.firstname} />
      <input type="hidden" name="hash" value={hash} />
      <input
        type="hidden"
        name="lastname"
        value={searchParams.get("lastname") || ""}
      />
      <input
        type="hidden"
        name="surl"
        value={`${process.env.CLIENT_API_URL}/payment/success`}
      />
      <input
        type="hidden"
        name="furl"
        value={`${process.env.CLIENT_API_URL}/payment/fail`}
      />
      <input
        type="hidden"
        name="phone"
        value={searchParams.get("number") || ""}
      />
    </form>
  );
};
const PaymentPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentComponent />
  </Suspense>
);

export default PaymentPage;

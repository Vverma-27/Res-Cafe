"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { initializeSDK } from "../../services/cashfree";
import useStore from "@/store";
const PaymentComponent = () => {
  const [sessionId, setSessionId] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { table } = useStore();
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
  // const paymentReq = useCallback(async () => {
  //   try {
  //     const BASE_URL =
  //       process.env.NODE_ENV === "production"
  //         ? `http://api.${location?.host}/restaurant/client`
  //         : process.env.NEXT_PUBLIC_CLIENT_API_URL || "";
  //     const response = await fetch(`${BASE_URL}/payment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //       credentials: "include",
  //     });
  //     const hash = (await response.json()).hash;
  //     setHash(hash);
  //   } catch (error) {
  //     console.log("Payment Error:", error);
  //   }
  // }, []);
  const data = useMemo(
    () => ({
      txnid, // String
      amount: searchParams.get("amount") || "0", // Float
      amountPayable: searchParams.get("amountPayable") || "0", // Float
      productinfo: searchParams.get("productinfo") || "", // String
      name:
        (searchParams.get("firstname") || "") +
        (searchParams.get("lastname") || ""), // String
      email: searchParams.get("email") || "", // String
      table,
      customer_id: searchParams.get("id") || "",
      number: searchParams.get("number") || "",
      throughLink: Boolean(searchParams.get("orderID")),
      orderID: searchParams.get("orderID"),
      transactionOrder: searchParams.get("selectedDishes"),
    }),
    [searchParams, txnid, table]
  );
  const paymentReqCashfree = useCallback(async () => {
    try {
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? `https://${location?.host.split(".")[0]}.api.${location?.host
              .split(".")
              .slice(1)
              .join(".")}/restaurant/client`
          : process.env.NEXT_PUBLIC_CLIENT_API_URL || "";
      const response = await fetch(`${BASE_URL}/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const session_id = (await response.json()).session_id;
      setSessionId(session_id);
    } catch (error) {
      console.log("Payment Error:", error);
    }
  }, [data]);
  // useEffect(() => {

  // }, [paymentReqCashfree, sessionId]);
  useEffect(() => {
    if (!sessionId) {
      paymentReqCashfree();
      return;
    }
    (async () => {
      const cashfree = await initializeSDK();
      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self", //optional ( _self, _blank, or _top)
      });
    })();
  }, [paymentReqCashfree, sessionId]);
  // useEffect(() => {
  //   paymentReq();
  // }, [paymentReq]);
  // useEffect(() => {
  //   if (hash) formRef.current?.submit();
  // }, [hash]);

  if (
    !searchParams.get("firstname") ||
    !searchParams.get("email") ||
    !searchParams.get("number") ||
    !searchParams.get("amount") ||
    !searchParams.get("amountPayable")
  ) {
    router.push("/");
    return null;
  }
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
  // return (
  //   <form action={process.env.NEXT_PUBLIC_PAYU_URL} method="post" ref={formRef}>
  //     <input
  //       type="hidden"
  //       name="key"
  //       value={process.env.NEXT_PUBLIC_PAYU_KEY}
  //     />
  //     <input type="hidden" name="txnid" value={txnid} />
  //     <input type="hidden" name="productinfo" value={data.productinfo} />
  //     <input type="hidden" name="amount" value={data.amount} />
  //     <input type="hidden" name="email" value={data.email} />
  //     {/* <input type="hidden" name="firstname" value={data.firstname} /> */}
  //     <input type="hidden" name="hash" value={hash} />
  //     <input type="hidden" name="udf1" value={searchParams.get("id") || ""} />
  //     <input type="hidden" name="udf2" value={restaurantName} />
  //     <input
  //       type="hidden"
  //       name="lastname"
  //       value={searchParams.get("lastname") || ""}
  //     />
  //     <input type="hidden" name="surl" value={`${BASE_URL}/payment/success`} />
  //     <input type="hidden" name="furl" value={`${BASE_URL}/payment/fail`} />
  //     <input
  //       type="hidden"
  //       name="phone"
  //       value={searchParams.get("number") || ""}
  //     />
  //   </form>
  // );
};
const PaymentPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentComponent />
  </Suspense>
);

export default PaymentPage;

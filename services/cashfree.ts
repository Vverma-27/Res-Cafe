import { load } from "@cashfreepayments/cashfree-js";
export const initializeSDK = async function () {
  const cashfree = await load({
    mode: "sandbox",
  });
  return cashfree;
};

export const getMenu = async () => {
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? `http://api.${location?.host}/restaurant/client`
      : process.env.NEXT_PUBLIC_CLIENT_API_URL || "";
  try {
    console.log(
      "🚀 ~ getMenu ~ process.env.CLIENT_API_URL:",
      process.env.NEXT_PUBLIC_CLIENT_API_URL
    );
    const res = await fetch(BASE_URL, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("🚀 ~ getMenu ~ e:", e);
    return { menu: {}, name: "" };
  }
};
export const createClient = async (dataArg: {
  email: string;
  number: string;
  name: string;
}) => {
  try {
    const BASE_URL =
      process.env.NODE_ENV === "production"
        ? `http://api.${location?.host}/restaurant/client`
        : process.env.NEXT_PUBLIC_CLIENT_API_URL || "";
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataArg),
      credentials: "include",
    });
    console.log("🚀 ~ res:", res);
    const data = await res.json();
    console.log("🚀 ~ createClient ~ data:", data);
    return data;
  } catch (e) {
    console.log("🚀 ~ createClient ~ e:", e);
    return { menu: {}, name: "" };
  }
};
export const getPastOrders = async () => {
  try {
    const BASE_URL =
      process.env.NODE_ENV === "production"
        ? `http://api.${location?.host}/restaurant/client`
        : process.env.NEXT_PUBLIC_CLIENT_API_URL || "";
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log("🚀 ~ getPastOrders ~ data:", data);
    return data;
  } catch (e) {
    console.log("🚀 ~ getMenu ~ e:", e);
    return { menu: {}, name: "" };
  }
};

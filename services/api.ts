export const getMenu = async () => {
  console.log(
    "🚀 ~ getMenu ~ process.env.CLIENT_API_URL:",
    process.env.NEXT_PUBLIC_CLIENT_API_URL
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.menu;
};

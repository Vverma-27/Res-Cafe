export const getMenu = async () => {
  const res = await fetch(`${process.env.CLIENT_API_URL}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.menu;
};

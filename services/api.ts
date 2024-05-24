export const getMenu = async () => {
  const res = await fetch(
    `http://howdy.example.localhost:3000/restaurant/client`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data.menu;
};

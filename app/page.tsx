"use client";
import DishCard from "@/components/dishCard";
import CustomLink from "@/components/link";
import { useEffect, useState } from "react";
import { IDish } from "@/interfaces";
import DishDisplay from "@/components/dishDisplay";
import useStore from "@/store";
import { getMenu, getPastOrders } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@/components/modal";
import { getSocket } from "@/services/socket";

export default function Home() {
  // const [cartOpen, setCartOpen] = useState(true);
  // const [menu, setMenu] = useState<{ [categoryName: string]: IDish[] }>({
  //   Appetizers: [
  //     {
  //       name: "Caesar Salad",
  //       description: "Fresh romaine lettuce with Caesar dressing and croutons",
  //       price: 8.99,
  //     },
  //     {
  //       name: "Garlic Bread",
  //       description: "Toasted bread with garlic and butter",
  //       price: 4.99,
  //     },
  //   ],
  //   "Main Courses": [
  //     {
  //       name: "Spaghetti Bolognese",
  //       description: "Spaghetti pasta with rich Bolognese sauce",
  //       price: 12.99,
  //     },
  //     {
  //       name: "Grilled Salmon",
  //       description: "Freshly grilled salmon fillet served with lemon",
  //       price: 16.99,
  //     },
  //   ],
  //   Chinese: [
  //     {
  //       name: "Spaghetti Bolognese",
  //       description: "Spaghetti pasta with rich Bolognese sauce",
  //       price: 12.99,
  //     },
  //     {
  //       name: "Grilled Salmon",
  //       description: "Freshly grilled salmon fillet served with lemon",
  //       price: 16.99,
  //     },
  //   ],
  //   Desserts: [
  //     {
  //       name: "Tiramisu",
  //       description:
  //         "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese",
  //       price: 7.99,
  //     },
  //     {
  //       name: "Chocolate Brownie",
  //       description: "Warm chocolate brownie served with vanilla ice cream",
  //       price: 5.99,
  //     },
  //   ],
  // });
  // const [activeDish, setActiveDish] = useState<IDish | null>(null);
  // const [cart, setCart] = useState<{
  //   [name: string]: { dish: IDish; qty: number };
  // }>({
  //   Tiramasu: {
  //     dish: {
  //       name: "Tiramisu",
  //       description:
  //         "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese",
  //       price: 7.99,
  //     },
  //     qty: 2,
  //   },
  //   "Chocolate Brownie": {
  //     dish: {
  //       name: "Chocolate Brownie",
  //       description: "Warm chocolate brownie served with vanilla ice cream",
  //       price: 5.99,
  //     },
  //     qty: 2,
  //   },
  //   "Chocolate Browni": {
  //     dish: {
  //       name: "Chocolate Brownie",
  //       description: "Warm chocolate brownie served with vanilla ice cream",
  //       price: 5.99,
  //     },
  //     qty: 2,
  //   },
  //   "Chocolate Bronie": {
  //     dish: {
  //       name: "Chocolate Brownie",
  //       description: "Warm chocolate brownie served with vanilla ice cream",
  //       price: 5.99,
  //     },
  //     qty: 2,
  //   },
  //   "Chocolate Bownie": {
  //     dish: {
  //       name: "Chocolate Brownie",
  //       description: "Warm chocolate brownie served with vanilla ice cream",
  //       price: 5.99,
  //     },
  //     qty: 2,
  //   },
  // });
  // const onAdd = (dish: IDish) => {
  //   let qty = 0;
  //   // setCart((cart) => {
  //   if (dish.name in cart) {
  //     if (cart[dish.name].qty + 1 <= 3) {
  //       qty = cart[dish.name].qty + 1;
  //       console.log("🚀 ~ setCart ~ qty:", qty);
  //       setCart((cart) => {
  //         return {
  //           ...cart,
  //           [dish.name]: {
  //             ...cart[dish.name],
  //             qty: cart[dish.name].qty + 1,
  //           },
  //         };
  //       });
  //     } else {
  //       qty = cart[dish.name].qty;
  //       console.log("🚀 ~ setCart ~ qty:", qty);
  //     }
  //   } else {
  //     qty = 1;
  //     console.log("🚀 ~ setCart ~ qty:", qty);
  //     setCart((cart) => {
  //       return {
  //         ...cart,
  //         [dish.name]: { dish, qty: 1 },
  //       };
  //     });
  //   }
  //   console.log("🚀 ~ onAdd ~ qty:", qty, cart);
  //   return qty;
  // };
  // const onRemove = (dish: IDish) => {
  //   let qty = 0;
  //   if (dish.name in cart) {
  //     if (cart[dish.name].qty - 1 >= 0) {
  //       qty = cart[dish.name].qty - 1;
  //       setCart((cart) => {
  //         return {
  //           ...cart,
  //           [dish.name]: {
  //             ...cart[dish.name],
  //             qty: cart[dish.name].qty - 1,
  //           },
  //         };
  //       });
  //     } else {
  //       qty = cart[dish.name].qty;
  //     }
  //   } else {
  //     qty = 0;
  //   }
  //   return qty;
  // };
  const router = useRouter();
  const {
    menu,
    setMenu,
    restaurantName,
    setRestaurantName,
    activeDish,
    cart,
    firstLoad,
    setFirstLoad,
    setPastOrders,
    setUsersAtTable,
    table,
    setTable,
    pastOrders,
    clientName,
    setClientName,
    addReq,
    addSharer,
    setSocket,
    setNumSplitters,
  } = useStore();
  const [activeCategory, setActiveCategory] = useState("");
  const [name, setName] = useState("");
  const searchParams = useSearchParams();
  // const [initalMenu, setInitMenu] = useState({});
  useEffect(() => {
    if (!table || !clientName) return;
    console.log("🚀 ~ useEffect ~ table:", table, clientName);
    // const socket = io("ws://localhost:3000/", {
    //   reconnectionDelayMax: 10000,
    //   query: {
    //     table: `${table}`,
    //     name: `${clientName}`,
    //   },
    //   transports: ["websocket", "polling"],
    // });
    const socket = getSocket(table, clientName);
    socket.connect();
    socket.on("connect", () => {
      setSocket(socket);
      console.log("Connected to server");
    });
    socket.on("users", (e) => {
      setUsersAtTable(e.filter((e: any) => e !== clientName));
    });
    socket.on("share-req", (e) => {
      console.log("🚀 ~ socket.on ~ e:", e);
      addReq(e);
    });
    socket.on("accept-req", (e) => {
      addSharer(e.dish, e.name);
    });
    socket.on("update-splitters", (e) => {
      setNumSplitters(e.dish, e.numSplitters);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, [
    table,
    clientName,
    addReq,
    addSharer,
    setNumSplitters,
    setSocket,
    setUsersAtTable,
  ]);
  useEffect(() => {
    (async () => {
      const { menu, name } = await getMenu();
      const { orders } = await getPastOrders();
      console.log("🚀 ~ orders:", orders);
      const dishFreq: { [name: string]: number } = {};
      const listOrders = orders?.map((e: any) => e.list);
      listOrders?.forEach((e: string) => {
        const dishesWFreq = e.split(",");
        dishesWFreq.forEach((dishArg) => {
          const [freq, dish] = dishArg.split("x");
          dishFreq[dish] = parseInt(freq);
        });
      });
      const entries = Object.entries(dishFreq);
      entries.sort((a, b) => b[1] - a[1]);
      const sortedDishNames = entries.map((entry) => entry[0]);
      const allDishes: IDish[] = Object.values(menu)
        .map((cat: any) => {
          return cat.dishes;
        })
        .reduce((acc, curr) => acc.concat(curr), []);
      const dishes = sortedDishNames
        .map((name) => {
          const dish = allDishes.find((d: IDish) => d.name === name);
          return dish;
        })
        .filter((e) => e !== undefined);
      //@ts-expect-error
      setPastOrders(dishes);
      setMenu(menu);
      setRestaurantName(name);
      const table = searchParams.get("table");
      setTable(table || "");
      setFirstLoad(false);
    })();
  }, [
    setMenu,
    searchParams,
    setFirstLoad,
    setPastOrders,
    setRestaurantName,
    setTable,
    setClientName,
  ]);
  useEffect(() => {
    if (menu && Object.keys(menu).length)
      setActiveCategory(Object.keys(menu)[0]);
  }, [menu]);
  useEffect(() => {
    // Only run this code on the client side
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name") as string);
      setClientName(localStorage.getItem("name") as string);
    }
  }, [setClientName]);
  if ((!restaurantName || !table) && !firstLoad) {
    router.push("/404");
    return null;
  }
  if (!menu || firstLoad)
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
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className=" text-4xl m-0">Welcome To {restaurantName}!</h2>
        <p>Good food is brewing</p>
        {(pastOrders.length && (
          <div className="mt-4 w-full">
            <p className="font-bold text-md">Your Favourites</p>
            <div className="overflow-x-scroll max-w-fit w-[calc(100vw-1rem)] flex p-1 pb-3 justify-between items-center gap-3 no-scrollbar">
              {pastOrders?.map((dish: IDish) => (
                <DishCard dish={dish} key={dish._id} />
              ))}
            </div>
          </div>
        )) ||
          null}
      </div>
      <div className="flex px-1 mb-3 justify-between items-center gap-3 overflow-x-scroll w-full bg-secondary no-scrollbar border border-solid border-[rgba(0,0,0,0.3)]">
        {Object.keys(menu).map((cat: string) => (
          <CustomLink
            key={cat}
            active={activeCategory === cat}
            text={cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
        {/* <CustomLink active={true} text={"All dishes"} />
        <CustomLink active={false} text={"Popular"} />
        <CustomLink active={false} text={"Chinese"} />
        <CustomLink active={false} text={"Asian"} />
        <CustomLink active={false} text={"Continental"} /> */}
      </div>
      <div className="flex justify-around items-stretch gap-y-12 w-full flex-wrap">
        {menu?.[activeCategory]?.dishes?.map((dish: IDish) => (
          <DishCard dish={dish} imageOverflow key={dish._id} />
        ))}
      </div>
      {!activeDish ? null : (
        <DishDisplay
          dish={activeDish}
          similar={menu[activeCategory]?.dishes || []}
          qty={cart[activeDish.name]?.qty || 0}
        />
      )}
      <Modal isOpen={!Boolean(clientName)} notClosable>
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
              <label htmlFor="Table Number" className="font-bold text-xs">
                Table Number
              </label>
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                }}
                value={table}
                className="bg-transparent rounded-lg text-sm font-semibold py-2 px-1 border-2"
                name="Table Number"
                disabled
              />
            </div>
          </div>
          <div className=" mt-4 flex justify-start gap-2">
            <button
              className="bg-[#FF9633] py-3.5 px-10 text-white rounded-xl text-sm"
              onClick={async () => {
                localStorage?.setItem("name", name);
                setClientName(name);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

"use client";
import DishCard from "@/components/dishCard";
import FeaturedCard from "@/components/featuredCard";
import SearchBar from "@/components/searchBar";
import { IoFastFoodOutline } from "react-icons/io5";
import Image from "next/image";
import CustomLink from "@/components/link";
import { useEffect, useState } from "react";
import { ICategories, IDish } from "@/interfaces";
import DishDisplay from "@/components/dishDisplay";
import Cart from "@/components/cart";
import useStore from "@/store";
import { getMenu, getPastOrders } from "@/services/api";
import { useRouter } from "next/navigation";

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
  } = useStore();
  const [activeCategory, setActiveCategory] = useState("");
  // console.log("🚀 ~ onAdd ~ cartOpen:", cartOpen);
  // const [initalMenu, setInitMenu] = useState({});
  useEffect(() => {
    (async () => {
      const { menu, name } = await getMenu();
      const { orders } = await getPastOrders();
      setMenu(menu);
      setRestaurantName(name);
      setFirstLoad(false);
    })();
  }, [setMenu]);
  useEffect(() => {
    if (menu && Object.keys(menu).length)
      setActiveCategory(Object.keys(menu)[0]);
  }, [menu]);
  if (!restaurantName && !firstLoad) {
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
      </div>
      {/* <div className="flex justify-center items-center gap-[8vh] w-fit text-black">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div> */}
      <div className="flex px-1 justify-between items-center gap-3 overflow-x-scroll w-full bg-secondary no-scrollbar border border-solid border-[rgba(0,0,0,0.3)]">
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
    </div>
  );
}

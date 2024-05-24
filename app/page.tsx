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
import { getMenu } from "@/services/api";

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
  const [menu, setMenu] = useStore((state) => [state.menu, state.setMenu]);
  console.log("🚀 ~ //onAdd ~ menu:", menu);
  const [activeDish, setActiveDish] = useStore((state) => [
    state.activeDish,
    state.setActiveDish,
  ]);
  const [cart, setCart] = useStore((state) => [state.cart, state.setCart]);
  const onAdd = useStore((state) => state.onAdd);
  const onRemove = useStore((state) => state.onRemove);
  const [activeCategory, setActiveCategory] = useState(Object.keys(menu)[0]);
  // console.log("🚀 ~ onAdd ~ cartOpen:", cartOpen);
  // const [initalMenu, setInitMenu] = useState({});
  useEffect(() => {
    (async () => {
      const menu = await getMenu();
      setMenu(menu);
    })();
  }, []);
  useEffect(() => {
    setActiveCategory(Object.keys(menu)[0]);
  }, [menu]);
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className=" text-4xl m-0">Welcome To Howdy</h2>
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
      <div className="flex justify-start items-center gap-6 w-full flex-wrap">
        {menu?.[activeCategory]?.dishes?.map((dish: IDish) => (
          <DishCard dish={dish} imageOverflow key={dish._id} />
        ))}
      </div>
      {!activeDish ? null : (
        <DishDisplay
          dish={activeDish}
          similar={menu[activeCategory].dishes}
          qty={cart[activeDish.name]?.qty || 0}
        />
      )}
    </div>
  );
}

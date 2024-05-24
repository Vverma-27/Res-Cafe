import { Cart, IDish, IStore, Menu } from "@/interfaces";
import { getMenu } from "@/services/api";
import { useEffect, useState } from "react";
import { create } from "zustand";
// const MENU: Menu = {
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
// };
// const CART: Cart = {
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
// };

const useStore = create((set, get: () => IStore) => {
  return {
    menu: {},
    setMenu: (menu: Menu) => set({ menu }),
    activeDish: null,
    setActiveDish: (activeDish: IDish | null) => set({ activeDish }),
    cart: {},
    setCart: (cart: Cart) => set({ cart }),
    onAdd: (dish: IDish) => {
      const cart = get().cart;
      const setCart = get().setCart;
      if (dish.name in cart) {
        if (cart[dish.name].qty + 1 <= 3) {
          setCart({
            ...cart,
            [dish.name]: {
              ...cart[dish.name],
              qty: cart[dish.name].qty + 1,
            },
          });
        }
      } else {
        setCart({
          ...cart,
          [dish.name]: { dish, qty: 1 },
        });
      }
    },
    onRemove: (dish: IDish) => {
      const cart = get().cart;
      const setCart = get().setCart;
      if (dish.name in cart) {
        if (cart[dish.name].qty - 1 >= 0) {
          setCart({
            ...cart,
            [dish.name]: {
              ...cart[dish.name],
              qty: cart[dish.name].qty - 1,
            },
          });
        }
      }
    },
  };
});
export default useStore;

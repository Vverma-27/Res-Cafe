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
    table: "",
    shareList: {},
    clientName: "",
    shareReqs: [],
    removeReq: () =>
      set((state) => {
        return { shareReqs: state.shareReqs.slice(1) };
      }),
    addReq: (e) =>
      set((state) => {
        return { shareReqs: [...state.shareReqs, e] };
      }),
    socket: null,
    setSocket: (socket) => set({ socket }),
    setClientName: (name: string) => set({ clientName: name }),
    pastOrders: [],
    addSharer: (dish, sharer) => {
      set((state) => {
        const shareList = { ...state.shareList };
        if (shareList[dish]) {
          if (!shareList[dish].includes(sharer)) {
            shareList[dish].push(sharer);
          }
        } else {
          shareList[dish] = [sharer];
        }
        return { shareList };
      });
    },
    removeSharer: (dish, sharer) => {
      set((state) => {
        const shareList = { ...state.shareList };
        if (shareList[dish]) {
          shareList[dish] = shareList[dish].filter((s) => s !== sharer);
          if (shareList[dish].length === 0) {
            delete shareList[dish];
          }
        }
        return { shareList };
      });
    },
    usersAtTable: [],
    setUsersAtTable: (users) =>
      set((state) => {
        const newShareList = Object.keys(state.shareList).reduce(
          (acc: { [key: string]: string[] }, dish) => {
            const filteredSharers = state.shareList[dish].filter((sharer) =>
              users.includes(sharer)
            );
            if (filteredSharers.length > 0) {
              acc[dish] = filteredSharers;
            }
            return acc;
          },
          {}
        );
        return {
          usersAtTable: users,
          shareList: newShareList,
        };
      }),
    setTable: (table: string | number) => set({ table }),
    setPastOrders: (orders) => set({ pastOrders: orders }),
    restaurantName: "",
    setRestaurantName: (restaurantName: string) => set({ restaurantName }),
    firstLoad: true,
    setFirstLoad: (val: boolean) => set({ firstLoad: val }),
    setMenu: (menu: Menu) => set({ menu }),
    activeDish: null,
    setActiveDish: (activeDish: IDish | null) => set({ activeDish }),
    cart: {},
    setCart: (cart: Cart) => set({ cart }),
    setNumSplitters: (dish, splitters) =>
      set((state) => {
        return {
          cart: {
            ...state.cart,
            [dish]: { ...state.cart[dish], numSplitters: splitters },
          },
        };
      }),
    onAdd: (dish: IDish, shared?: string, numSplitters?: number) => {
      const cart = get().cart;
      const setCart = get().setCart;
      if (shared)
        return setCart({
          ...cart,
          [dish.name]: {
            ...(cart[dish.name] || {}),
            dish,
            qty: 1,
            shared,
            numSplitters,
          },
        });
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

import { Socket } from "socket.io-client";

export interface IRestaurant {
  menu: ICategories[];
  name: string;
}
export interface ICategories {
  name: string;
  dishes: IDish[];
}
export type Menu = { [categoryName: string]: { dishes: IDish[]; _id: string } };
export interface IDish {
  veg: boolean;
  name: string;
  _id: string;
  price: number;
  description?: string;
  image?: string;
  unavailable?: boolean;
}
export type Cart = {
  [name: string]: {
    dish: IDish;
    qty: number;
    // shared?: string;
    numSplitters?: number;
    exclude?: boolean;
  };
};
export interface IShareReq {
  name: string;
  dish: string;
  price: number;
  image: string;
  veg: boolean;
  _id: string;
  numSplitters: number;
}
export interface IStore {
  menu: Menu;
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  setTable: (id: string | number) => void;
  setNumSplitters: (dish: string, splitters: number) => void;
  setExclude: (dish: string, exclude: boolean) => void;
  table: string | number;
  // shareReqs: IShareReq[];
  // addReq: (req: IShareReq) => void;
  // removeReq: () => void;
  // // setShareList: (list: { dish: string; sharers: string[] }[]) => void;
  // addSharer: (dish: string, sharer: string) => void;
  // removeSharer: (dish: string, sharer: string) => void;
  // shareList: { [name: string]: string[] };
  clientName: string;
  setClientName: (name: string) => void;
  // usersAtTable: string[];
  // setUsersAtTable: (a: string[]) => void;
  setMenu: (menu: Menu) => void;
  restaurantName: string;
  setRestaurantName: (name: string) => void;
  activeDish: null | IDish;
  setActiveDish: (activeDish: IDish | null) => void;
  cart: Cart;
  setCart: (cart: Cart) => void;
  onAdd: (dish: IDish, shared?: string, numSplitters?: number) => void;
  onRemove: (dish: IDish) => void;
  firstLoad: boolean;
  setFirstLoad: (val: boolean) => void;
  pastOrders: IDish[];
  setPastOrders: (orders: IDish[]) => void;
}

export enum OrderStatus {
  CREATED = "CREATED",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAIDINFULL = "PAIDINFULL",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

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
}
export type Cart = {
  [name: string]: { dish: IDish; qty: number };
};
export interface IStore {
  menu: Menu;
  setMenu: (menu: Menu) => void;
  restaurantName: string;
  setRestaurantName: (name: string) => void;
  activeDish: null | IDish;
  setActiveDish: (activeDish: IDish | null) => void;
  cart: Cart;
  setCart: (cart: Cart) => void;
  onAdd: (dish: IDish) => void;
  onRemove: (dish: IDish) => void;
  firstLoad: boolean;
  setFirstLoad: (val: boolean) => void;
  pastOrders: IDish[];
  setPastOrders: (orders: IDish[]) => void;
}

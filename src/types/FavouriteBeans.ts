import { CoffeeType } from "./Coffee";
export type FavouriteBeanListType = {
  bean: CoffeeType;
  createdAt: string;
  favorite: boolean;
  triedIt: boolean;
  user: string;
  _id: string;
  __v: number;
};

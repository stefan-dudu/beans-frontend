import { CoffeeType } from "./Coffee";
export type FavouriteBeanListType = {
  bean: CoffeeType;
  createdAt: string;
  favourite: boolean;
  triedIt: boolean;
  user: string;
  _id: string;
  __v: number;
};

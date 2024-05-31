export type CoffeeLocationType = {
  _id: string;
  type: "Country" | "Farm";
  name: string;
  subtitle: string;
  description: string;
  mainTypes: string;
  altitude: string;
  worldShare: number;
  processing: string;
  challenges: string[];
  __v: number;
  image: string;
};

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExploreRow from "../components/ExploreRow";

type Props = {};

type Coffee = {
  _id: string;
  name: string;
  origin: string;
  roastLevel: string;
  flavorNotes: string[];
  aroma: string;
  acidity: number;
  body: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  image: string;
  locations: {
    type: string;
    coordinates: number[];
    description: string;
    _id: string;
    id: string;
  }[];
  slug: string;
  id: string;
};

const Explore: React.FC<Props> = (props) => {
  const [data, setData] = useState<Coffee[] | null>(null);
  const { state } = useLocation();

  useEffect(() => {
    setData(state?.data);
  }, [state]);

  console.log("results in explore", data);

  return (
    <div>
      {data &&
        data.map((el) => {
          return <ExploreRow key={el._id} data={el} />;
        })}
    </div>
  );
};

export default Explore;

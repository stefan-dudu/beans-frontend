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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { state } = useLocation();

  // TODO: Paginating, to increase loading time
  const fetchAllBeans = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}api/v1/beans`, {
        headers: {
          "Content-Type": "application/json",
        },
        // TODO: ESSENTIAL FOR jwt
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      setData(data.data);
      setError(null);
    } catch (err: any) {
      setData(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state?.data) {
      // console.log("there is no data so i will show beans to explore");
      fetchAllBeans();
    } else if (state?.data) {
      // console.log("has data - it means it been redirected from a page ");
      setData(state?.data);
    }
  }, [state]);

  return (
    <div>
      <div>
        <h4>Filter btn</h4>
        {data &&
          data.map((el) => {
            return (
              <div>
                {/* TODO: have a filtering way for results */}
                <ExploreRow key={el._id} data={el} />;
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Explore;

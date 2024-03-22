import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopItems.scss";

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

const TopItems = (props: any) => {
  const [data, setData] = useState<Coffee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PROD_URL}api/v1/beans/top-7`
        );
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

    fetchDataForPosts();
  }, []);

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src =
      "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/catchBeanBag.jpg";
  }

  return (
    <div>
      <h2>Top beans </h2>
      <div className="container">
        {data &&
          data?.map((el) => (
            <Link to={`/coffee/${el._id}`}>
              <div className="item">
                <img
                  src={el?.image}
                  width="200"
                  height="200"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                  onError={addDefaultSrc}
                />
              </div>
              {el?.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TopItems;

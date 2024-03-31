import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RateBean from "../components/RateBean";
import DetailedBeanMap from "../components/DetailedBeanMap";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";

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

const DetailedCoffeeBeans = (props: any) => {
  const [data, setData] = useState<Coffee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  let { id } = useParams();

  useEffect(() => {
    dispatch(isLoading());
    fetchDataForPosts();
  }, [id]);

  const fetchDataForPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // TODO: ESSENTIAL FOR jwt
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      setData(data.data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      dispatch(notLoading());
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src =
      "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/catchBeanBag.jpg";
  }

  const SkeletonComponent = () => {
    return (
      <div>
        <Skeleton variant="text" width={200} />
        <Skeleton variant="rounded" width={200} height={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="rounded" width={"100vw"} height={200} />
      </div>
    );
  };

  return (
    <div>
      {loadingData ? (
        <SkeletonComponent />
      ) : (
        <div>
          <h2>{data?.name || "name"}</h2>
          <div className="item">
            {
              <img
                src={data?.image}
                width="200"
                height="200"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                onError={addDefaultSrc}
              />
            }
          </div>
          <p>No of ratings: {data?.ratingsQuantity}</p>
          <p>Avg.rating: {data?.ratingsAverage}</p>
          <RateBean maxStars={5} currentRating={data?.ratingsAverage} />
          {data?.locations && <DetailedBeanMap location={data?.locations} />}
        </div>
      )}
    </div>
  );
};

export default DetailedCoffeeBeans;

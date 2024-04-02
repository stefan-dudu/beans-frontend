import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import "./TopItems.scss";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import catchBeanBag from "../assets/catchBeanBag.jpg";

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

const BestBeans2023 = (props: any) => {
  const [data, setData] = useState<Coffee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}api/v1/beans?brand=Origo`,
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
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
        dispatch(notLoading());
      }
    };
    dispatch(isLoading());
    fetchDataForPosts();
  }, []);

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

  const SkeletonComponent = () => {
    const skeletons = [];

    for (let i = 0; i < 10; i++) {
      skeletons.push(
        <div key={i} className="skeletonItem">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={200}
            height={200}
          />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      );
    }

    return <>{skeletons}</>;
  };

  return (
    <div>
      <h2 style={{ padding: "1rem 0rem" }}> 2023 Awards</h2>
      <div className="topBeansContainer">
        {loadingData && <SkeletonComponent />}
        {data &&
          data?.map((el) => (
            <Link to={`/coffee/${el._id}`} key={el._id}>
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

export default BestBeans2023;

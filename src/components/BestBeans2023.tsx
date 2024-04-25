import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import "./TopItems.scss";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import BeanCard from "./BeanCard";
import { CoffeeType } from "../types/Coffee";

const BestBeans2023 = (props: any) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);
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
          `${process.env.REACT_APP_URL}api/v1/beans?roastLevel=Medium-Dark`,
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
    fetchDataForPosts();
  }, []);

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
    <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
      <h2
        style={{ padding: "1rem 0rem", marginLeft: "1rem", color: "#006241" }}
      >
        2023 Awards
      </h2>
      <div className="topBeansContainer">
        {loadingData && <SkeletonComponent />}
        {data && data?.map((el) => <BeanCard key={el.id} data={el} />)}
      </div>
    </div>
  );
};

export default BestBeans2023;

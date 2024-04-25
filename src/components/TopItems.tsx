import React, { useEffect, useState } from "react";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import "./TopItems.scss";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import BeanCard from "./BeanCard";
import { CoffeeType } from "../types/Coffee";

const TopItems = (props: any) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const fetchDataForPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/top-7`,
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
    } catch (err: any) {
      setData(null);
    } finally {
      dispatch(notLoading());
    }
  };

  useEffect(() => {
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
    <div className="top-items-wrapper">
      <h2
        style={{ padding: "1rem 0rem", marginLeft: "1rem", color: "#006241" }}
      >
        Trending right now ...
      </h2>
      <div className="topBeansContainer">
        {loadingData && <SkeletonComponent />}
        {data && data?.map((el) => <BeanCard key={el.id} data={el} />)}
      </div>
    </div>
  );
};

export default TopItems;

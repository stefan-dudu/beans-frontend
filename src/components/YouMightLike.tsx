import React, { useEffect, useState, useRef } from "react";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import "./TopItems.scss";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import BeanCard from "./BeanCard";
import { CoffeeType } from "../types/Coffee";
import useIntersectionObserver from "../utils/useIntersectionObserver";

const YouMightLike = (props: any) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef);
  const hasFetchedData = useRef<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}api/v1/beans?roastLevel=Dark`,
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
    if (isVisible && !hasFetchedData.current) {
      // dispatch(isLoading());
      fetchDataForPosts();
      hasFetchedData.current = true;
    }
  }, [isVisible, dispatch]);

  const SkeletonComponent = () => {
    const skeletons = [];

    for (let i = 0; i < 2; i++) {
      skeletons.push(
        <div key={i} className="skeletonItem">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={200}
            height={"20rem"}
          />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      );
    }
    return <>{skeletons}</>;
  };

  return (
    <div className="top-items-wrapper" ref={containerRef}>
      <div className="section-title">You might like these</div>
      <div className="topBeansContainer">
        {loadingData || loading ? (
          <SkeletonComponent />
        ) : (
          data && data.map((el) => <BeanCard key={el.id} data={el} />)
        )}
      </div>
    </div>
  );
};

export default YouMightLike;

import React, { useEffect, useState } from "react";
import LocationsMap from "../components/map/LocationsMap";
import { CoffeeType } from "../types/Coffee";
import { notLoading, isLoading } from "../store/navBar/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Locations.scss";
import Skeleton from "@mui/material/Skeleton";

type Props = {};

const Locations = (props: Props) => {
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
          `${process.env.REACT_APP_URL}api/v1/beans`,
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

  const SkeletonComponent = () => {
    const skeletons = [];

    for (let i = 0; i < 1; i++) {
      skeletons.push(
        <div key={i} className="skeletonItem">
          <Skeleton
            animation="wave"
            variant="rounded"
            // width={200}
            width={"100%"}
            height={500}
            className="skeleton-component"
          />
        </div>
      );
    }

    return <>{skeletons}</>;
  };

  return (
    <div className="locationsWrapper">
      <div className="location-title">
        Coffee farms locations and informations, so you know where you coffee
        beans are comming from
      </div>
      {loadingData && <SkeletonComponent />}
      {data && <LocationsMap data={data} />}
    </div>
  );
};

export default Locations;

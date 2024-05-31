import React, { useEffect, useState } from "react";
import LocationsMap from "../components/map/LocationsMap";
import { CoffeeType } from "../types/Coffee";
import { notLoading, isLoading } from "../store/navBar/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Locations.scss";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet-async";

type Props = {};

const Locations = (props: Props) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);

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
      } catch (err: any) {
        setData(null);
      } finally {
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
      <Helmet>
        <title>Baristretto: A glance of the sources of coffee beans.</title>
        <meta
          name="description"
          content="Discover from which country, region, farm, and farmer your coffee is coming from, and find out more about the source of your coffee beans."
        />
        <link rel="canonical" href={`/locations`} />
      </Helmet>
      {/* <div className="location-title">
        Coffee farms locations and informations, so you know where you coffee
        beans are comming from
      </div> */}
      {loadingData && <SkeletonComponent />}
      {data && <LocationsMap data={data} />}
    </div>
  );
};

export default Locations;
